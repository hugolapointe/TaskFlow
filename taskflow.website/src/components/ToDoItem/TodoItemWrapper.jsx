/**
 * TodoItemWrapper Component
 * Container component that manages the edit state for a todo item
 * Switches between display mode (TodoItem) and edit mode (TodoItemEdit)
 */

import { useState } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import { confirmArchive } from '../../utils/confirmations';
import TodoItem from './components/ToDoItem/TodoItem';
import TodoItemEdit from './components/ToDoItemEdit/TodoItemEdit';

const TodoItemWrapper = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateTodo, togglePriority, toggleComplete, archiveTodo } = useTodos();

    // ==================== EVENT HANDLERS ====================

    /**
     * Handles saving changes when in edit mode
     * Now includes priority changes along with description and dueDate
     */
    const handleSave = async (updates) => {
        await updateTodo(todo.id, updates);
        setIsEditing(false);
    };

    /**
     * Handles canceling edit mode
     */
    const handleCancel = () => {
        setIsEditing(false);
    };

    /**
     * Handles toggling todo priority (only used in read mode)
     */
    const handleTogglePriority = async () => {
        await togglePriority(todo.id);
    };

    /**
     * Handles toggling completion status or archiving
     */
    const handleCompleteOrArchive = async () => {
        if (todo.isCompleted) {
            // If already completed, ask to archive
            if (confirmArchive()) {
                await archiveTodo(todo.id);
            }
        } else {
            // Mark as completed
            await toggleComplete(todo.id);
        }
    };

    // ==================== RENDER ====================

    if (isEditing) {
        return (
            <TodoItemEdit
                todo={todo}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <TodoItem
            todo={todo}
            onEdit={() => setIsEditing(true)}
            onTogglePriority={handleTogglePriority}
            onCompleteOrArchive={handleCompleteOrArchive}
        />
    );
};

export default TodoItemWrapper;
