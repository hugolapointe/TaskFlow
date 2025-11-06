import { memo, useState } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { isOverdue } from '../../utils/todoUtils';
import { confirmArchive } from '../../utils/confirmations';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ToDoItemContent from './components/ToDoItemContent';
import ToDoItemAction from './components/ToDoItemAction';
import ToDoItemAudit from './components/ToDoItemAudit';
import styles from './ToDoItem.module.css';

const ToDoItem = memo(({ todo, isEditing, onEditStart, onEditCancel }) => {
  const { actions } = useToDos();
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const isTaskOverdue = isOverdue(todo.dueDate, todo.isCompleted);

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (!isEditing) {
      setEditDescription(todo.description);
      setEditDueDate(todo.dueDate || '');
      onEditStart();
    }
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    if (!editDescription.trim()) return;

    await actions.update(todo.id, {
      description: editDescription.trim(),
      dueDate: editDueDate || null
    });
    onEditCancel();
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setEditDescription(todo.description);
    setEditDueDate(todo.dueDate || '');
    onEditCancel();
  };

  const handleComplete = () => {
    actions.toggleComplete(todo.id);
    if (isEditing) {
      onEditCancel();
    }
  };

  const handleArchive = () => {
    if (confirmArchive()) {
      actions.archive(todo.id);
      if (isEditing) {
      onEditCancel();
      }
    }
  };

  const handleTogglePriority = (e) => {
    e.stopPropagation();
    actions.togglePriority(todo.id);
  };

  return (
    <div
    className={styles.container}
      data-editing={isEditing}
      data-completed={todo.isCompleted}
      data-priority={todo.isPriority}
    >
      <div className={styles.mainContent}>
      <ToDoItemContent
 todo={todo}
    isOverdue={isTaskOverdue}
          isEditing={isEditing}
 editDescription={editDescription}
  editDueDate={editDueDate}
          onDescriptionChange={setEditDescription}
    onDueDateChange={setEditDueDate}
          onTogglePriority={handleTogglePriority}
        />
        
 <div className={styles.actionsContainer}>
          {isEditing ? (
   <>
   <button
    onClick={handleSaveClick}
    className={styles.saveButton}
        title="Save"
    disabled={!editDescription.trim()}
            >
      <CheckIcon className={styles.actionIcon} />
  </button>
    <button
            onClick={handleCancelClick}
    className={styles.cancelButton}
       title="Cancel"
        >
   <XMarkIcon className={styles.actionIcon} />
   </button>
  </>
          ) : (
    <>
      <button
          onClick={handleEditClick}
      className={styles.editButton}
      title="Edit"
        >
  <PencilIcon className={styles.actionIcon} />
         </button>
 <ToDoItemAction
                todo={todo}
       onComplete={handleComplete}
   onArchive={handleArchive}
      />
            </>
          )}
        </div>
      </div>

      {isEditing && <ToDoItemAudit todo={todo} />}
    </div>
  );
});

ToDoItem.displayName = 'ToDoItem';

export default ToDoItem;
