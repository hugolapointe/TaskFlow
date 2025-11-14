import { useState } from 'react';
import { useToDos } from '../../../context/ToDoContext';
import { VALIDATION_MESSAGES } from '../../../constants/toDoConstants';
import { formatDate } from '@utils/date';
import { cn } from '@utils/cn';
import toast from 'react-hot-toast';
import Card from '@common/surfaces/Card';
import ToDoItemView from './ToDoItemView';
import ToDoItemEdit from './ToDoItemEdit';
import ToDoItemCompleted from './ToDoItemCompleted';
import ToDoItemAudit from './ToDoItemAudit';

const ToDoItem = ({ todo }) => {
    const { updateTodo, togglePriority, completeTodo, archiveTodo } = useToDos();

    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate ? formatDate(todo.dueDate) : '');
    const [isPriority, setIsPriority] = useState(todo.isPriority);

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

        const updates = {
            description: description.trim(),
            dueDate: dueDate || null,
            isPriority,
        };

        try {
            await updateTodo(todo.id, updates);
            setIsEditing(false);
        } catch (error) {
            // Toast déjà affiché par l'action
        }
    };

    const onTogglePriority = async (e) => {
        e.stopPropagation();

        if (isEditing) {
            setIsPriority(!isPriority);
            return;
        }

        try {
            await togglePriority(todo.id);
        } catch (error) {
            // Toast déjà affiché
        }
    };

    const onComplete = async (e) => {
        e.stopPropagation();

        try {
            await completeTodo(todo.id);
            setIsSelected(false);
        } catch (error) {
            // Toast déjà affiché
        }
    };

    const onArchive = async (e) => {
        e.stopPropagation();

        try {
            await archiveTodo(todo.id);
            setIsSelected(false);
        } catch (error) {
            // Toast déjà affiché
        }
    };

    const cardClasses = cn(
        'transition-all cursor-pointer',
        isSelected || isEditing ? 'ring-2 ring-[var(--color-input-focus-ring)]' : '',
        todo.isCompleted && 'opacity-60',
        todo.isPriority && !todo.isCompleted && 'border-[var(--color-priority)]/30',
        !todo.isPriority && !todo.isCompleted && 'border-[var(--color-primary)]/30'
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
                        onTogglePriority={onTogglePriority}
                        onSave={handleSave}
                        onCancel={handleCancelEdit}
                        isSubmitting={false}
                    />
                ) : todo.isCompleted ? (
                    <ToDoItemCompleted
                        todo={todo}
                        onEdit={handleEdit}
                        onArchive={onArchive}
                        onTogglePriority={onTogglePriority}
                        disabled={isEditing}
                    />
                ) : (
                    <ToDoItemView
                        todo={todo}
                        onEdit={handleEdit}
                        onComplete={onComplete}
                        onTogglePriority={onTogglePriority}
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
