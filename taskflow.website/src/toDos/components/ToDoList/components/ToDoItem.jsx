import { useState } from 'react';
import { useToDos } from '../../../../hooks/useToDos';
import { updateToDo, toggleToDoPriority, markToDoAsCompleted, archiveToDo } from '../../../../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../../../utils/constants';
import { formatDate } from '../../../../utils/date';
import { cn } from '../../../../utils/cn';
import toast from 'react-hot-toast';
import Card from '../../../../common/Card';
import ToDoItemView from './ToDoItemView';
import ToDoItemEdit from './ToDoItemEdit';
import ToDoItemCompleted from './ToDoItemCompleted';
import ToDoItemAudit from './ToDoItemAudit';

const ToDoItem = ({ todo }) => {
    const { setToDos, setStats } = useToDos();

    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate ? formatDate(todo.dueDate) : '');
    const [isPriority, setIsPriority] = useState(todo.isPriority);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isSelected, setIsSelected] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
        if (isEditing) return;
        setIsSelected(!isSelected);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsSelected(true);
        setDescription(todo.description);
        setDueDate(todo.dueDate ? formatDate(todo.dueDate) : '');
        setIsPriority(todo.isPriority);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setDescription(todo.description);
        setDueDate(todo.dueDate ? formatDate(todo.dueDate) : '');
        setIsPriority(todo.isPriority);
    };

    const handleSave = async () => {
        if (!description.trim()) {
            toast.error(VALIDATION_MESSAGES.DESCRIPTION_REQUIRED);
            return;
        }

        setIsSubmitting(true);

        try {
            const updates = {
                description: description.trim(),
                dueDate: dueDate || null,
                isPriority,
            };

            const updatedToDo = await updateToDo(todo.id, updates);

            setToDos(prev => prev.map(t => t.id === todo.id ? updatedToDo : t));

            if (todo.isPriority !== updatedToDo.isPriority) {
                setStats(prev => ({
                    ...prev,
                    priority: updatedToDo.isPriority ? prev.priority + 1 : prev.priority - 1,
                    nonPriority: updatedToDo.isPriority ? prev.nonPriority - 1 : prev.nonPriority + 1
                }));
            }

            toast.success(SUCCESS_MESSAGES.UPDATE);
            setIsEditing(false);
        } catch (error) {
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

        try {
            const updatedToDo = await toggleToDoPriority(todo.id);

            setToDos(prev => prev.map(t =>
                t.id === todo.id ? updatedToDo : t
            ));

            setStats(prev => ({
                ...prev,
                priority: updatedToDo.isPriority ? prev.priority + 1 : prev.priority - 1,
                nonPriority: updatedToDo.isPriority ? prev.nonPriority - 1 : prev.nonPriority + 1
            }));

            toast.success(SUCCESS_MESSAGES.TOGGLE_PRIORITY);
        } catch (error) {
            toast.error(ERROR_MESSAGES.TOGGLE_PRIORITY);
        }
    };

    const handleComplete = async (e) => {
        e.stopPropagation();

        try {
            const updatedToDo = await markToDoAsCompleted(todo.id);

            setToDos(prev => prev.map(t =>
                t.id === todo.id ? updatedToDo : t
            ));

            setStats(prev => ({
                ...prev,
                completed: prev.completed + 1
            }));

            toast.success(SUCCESS_MESSAGES.COMPLETE);
            setIsSelected(false);
        } catch (error) {
            toast.error(ERROR_MESSAGES.COMPLETE);
        }
    };

    const handleArchive = async (e) => {
        e.stopPropagation();

        if (!confirm('Are you sure you want to archive this task?')) {
            return;
        }

        try {
            await archiveToDo(todo.id);

            setToDos(prev => prev.filter(t => t.id !== todo.id));

            setStats(prev => ({
                total: prev.total - 1,
                priority: todo.isPriority ? prev.priority - 1 : prev.priority,
                nonPriority: !todo.isPriority ? prev.nonPriority - 1 : prev.nonPriority,
                completed: todo.isCompleted ? prev.completed - 1 : prev.completed
            }));

            toast.success(SUCCESS_MESSAGES.ARCHIVE);
            setIsSelected(false);
        } catch (error) {
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
                        disabled={isEditing}
                    />
                ) : (
                    <ToDoItemView
                        todo={todo}
                        onEdit={handleEdit}
                        onComplete={handleComplete}
                        onTogglePriority={handleTogglePriority}
                        disabled={isEditing}
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
