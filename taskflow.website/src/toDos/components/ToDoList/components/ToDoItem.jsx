import { useState } from 'react';
import { useToDos } from '../../../../hooks/useToDos';
import { updateToDo, toggleToDoPriority, markToDoAsCompleted, archiveToDo } from '../../../../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../../../utils/constants';
import { formatDate } from '../../../../utils/date';
import { cn } from '../../../../utils/cn';
import toast from 'react-hot-toast';
import Card from '../../../../common/Card';
import ToDoItemView from './ToDoItemView';
import ToDoItemEdit from './ToDoItemEdit';
import ToDoItemCompleted from './ToDoItemCompleted';
import ToDoItemAudit from './ToDoItemAudit';

const ToDoItem = ({ todo }) => {
  const { toDos, setToDos, loadStats, selectedId, setSelectedId, editingId, setEditingId } = useToDos();
  
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.dueDate ? formatDate(todo.dueDate) : '');
  const [isPriority, setIsPriority] = useState(todo.isPriority);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSelected = selectedId === todo.id;
  const isEditing = editingId === todo.id;

  const handleClick = () => {
    if (editingId !== null) return;
    setSelectedId(isSelected ? null : todo.id);
  };

  const handleEdit = () => {
    setEditingId(todo.id);
    setSelectedId(todo.id);
    setDescription(todo.description);
    setDueDate(todo.dueDate ? formatDate(todo.dueDate) : '');
    setIsPriority(todo.isPriority);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDescription(todo.description);
    setDueDate(todo.dueDate ? formatDate(todo.dueDate) : '');
    setIsPriority(todo.isPriority);
  };

  const handleSave = async () => {
    if (!description.trim()) {
      toast.error('Description is required');
 return;
    }

    setIsSubmitting(true);
    const previousToDos = [...toDos];

    try {
  setToDos((prev) =>
 prev.map((t) =>
          t.id === todo.id
    ? { ...t, description: description.trim(), dueDate: dueDate || null, isPriority, updatedAt: new Date().toISOString() }
   : t
   )
   );

      await updateToDo(todo.id, {
  description: description.trim(),
        dueDate: dueDate || null,
        isPriority,
    });

   await loadStats();
      toast.success(SUCCESS_MESSAGES.UPDATE);
   setEditingId(null);
    } catch (error) {
    setToDos(previousToDos);
      toast.error(ERROR_MESSAGES.UPDATE);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePriority = async (e) => {
    e.stopPropagation();
    
    if (isEditing) {
      setIsPriority(!isPriority);
      return;
    }

 const previousToDos = [...toDos];

  try {
    setToDos((prev) =>
    prev.map((t) => (t.id === todo.id ? { ...t, isPriority: !t.isPriority } : t))
  );

  await toggleToDoPriority(todo.id);
      await loadStats();
      toast.success(SUCCESS_MESSAGES.TOGGLE_PRIORITY);
    } catch (error) {
      setToDos(previousToDos);
      toast.error(ERROR_MESSAGES.TOGGLE_PRIORITY);
    }
  };

  const handleComplete = async (e) => {
    e.stopPropagation();
    const previousToDos = [...toDos];

    try {
   setToDos((prev) =>
   prev.map((t) => (t.id === todo.id ? { ...t, isCompleted: true } : t))
      );

      await markToDoAsCompleted(todo.id);
      await loadStats();
      toast.success(SUCCESS_MESSAGES.COMPLETE);
    setSelectedId(null);
    } catch (error) {
      setToDos(previousToDos);
      toast.error(ERROR_MESSAGES.COMPLETE);
    }
  };

  const handleArchive = async (e) => {
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to archive this task?')) {
      return;
    }

    const previousToDos = [...toDos];

    try {
      setToDos((prev) => prev.filter((t) => t.id !== todo.id));

await archiveToDo(todo.id);
      await loadStats();
      toast.success(SUCCESS_MESSAGES.ARCHIVE);
      setSelectedId(null);
    } catch (error) {
      setToDos(previousToDos);
  toast.error(ERROR_MESSAGES.ARCHIVE);
    }
  };

  const cardClasses = cn(
    'transition-all cursor-pointer',
    isSelected || isEditing ? 'ring-2 ring-blue-500' : '',
    todo.isCompleted && 'opacity-60',
    todo.isPriority && !todo.isCompleted && 'border-orange-500/30',
    !todo.isPriority && !todo.isCompleted && 'border-blue-500/30'
  );

  return (
    <Card className={cardClasses} onClick={handleClick}>
      <div>
        {isEditing ? (
          <ToDoItemEdit
       description={description}
     setDescription={setDescription}
     dueDate={dueDate}
     setDueDate={setDueDate}
    isPriority={isPriority}
      onTogglePriority={handleTogglePriority}
            onSave={handleSave}
            onCancel={handleCancelEdit}
     isSubmitting={isSubmitting}
          />
        ) : todo.isCompleted ? (
      <ToDoItemCompleted
            todo={todo}
   onEdit={handleEdit}
        onArchive={handleArchive}
            onTogglePriority={handleTogglePriority}
            disabled={editingId !== null}
          />
        ) : (
      <ToDoItemView
            todo={todo}
      onEdit={handleEdit}
 onComplete={handleComplete}
          onTogglePriority={handleTogglePriority}
  disabled={editingId !== null}
  />
    )}

        {(isSelected || isEditing) && (
   <ToDoItemAudit createdAt={todo.createdAt} updatedAt={todo.updatedAt} />
    )}
      </div>
 </Card>
  );
};

export default ToDoItem;
