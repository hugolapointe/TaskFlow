/**
 * TodoItemEdit Component
 * Edit mode for a todo item
 * Allows editing description, due date, priority, and shows audit information
 */

import { useState, useEffect } from 'react';
import { formatDateReadable } from '../../../../utils/dateUtils';
import {
    CheckIcon,
    XMarkIcon,
    ClockIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import styles from './TodoItem.module.css';

const TodoItemEdit = ({ todo, onSave, onCancel }) => {
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate || '');
    const [isPriority, setIsPriority] = useState(todo.isPriority);

    // Reset form if todo changes while editing
    useEffect(() => {
        setDescription(todo.description);
        setDueDate(todo.dueDate || '');
        setIsPriority(todo.isPriority);
    }, [todo.description, todo.dueDate, todo.isPriority]);

    /**
     * Handles save button click
     * Saves all changes including priority
     */
    const handleSave = () => {
        // Validate that description is not empty
        if (!description.trim()) return;

        onSave({
            description: description.trim(),
            dueDate: dueDate || null,
            isPriority: isPriority
        });
    };

    /**
     * Handles cancel button click
     */
    const handleCancel = () => {
        onCancel();
    };

    /**
     * Handles priority toggle
     */
    const handleTogglePriority = () => {
        setIsPriority(prev => !prev);
    };

    /**
     * Prevents event propagation for input clicks
     */
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className={styles.container}
            data-editing={true}
            data-completed={todo.isCompleted}
            data-priority={isPriority}
        >
            <div className={styles.mainContent}>
                {/* Left Section: Priority + Inputs */}
                <div className={styles.leftSection}>
                    {/* Priority Button */}
                    <button
                        onClick={handleTogglePriority}
                        className={styles.priorityButton}
                        title={isPriority ? 'Remove priority' : 'Mark as priority'}
                        aria-label={isPriority ? 'Remove priority' : 'Mark as priority'}
                        type="button"
                    >
                        <ExclamationCircleIcon
                            className={`${styles.priorityIcon} ${
                                isPriority ? styles.active : styles.inactive
                            }`}
                        />
                    </button>

                    {/* Description Input */}
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.descriptionInput}
                        onClick={stopPropagation}
                        autoFocus
                        aria-label="Edit task description"
                    />

                    {/* Due Date Input */}
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={styles.dueDateInput}
                        onClick={stopPropagation}
                        aria-label="Edit due date"
                    />
                </div>

                {/* Right Section: Action Buttons */}
                <div className={styles.actionsContainer}>
                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className={styles.saveButton}
                        title="Save"
                        aria-label="Save changes"
                        disabled={!description.trim()}
                        type="button"
                    >
                        <CheckIcon className={styles.actionIcon} />
                    </button>

                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className={styles.cancelButton}
                        title="Cancel"
                        aria-label="Cancel editing"
                        type="button"
                    >
                        <XMarkIcon className={styles.actionIcon} />
                    </button>
                </div>
            </div>

            {/* Audit Section */}
            <div className={styles.auditSection}>
                <div className={styles.auditRow}>
                    <ClockIcon className={styles.auditIcon} />
                    <span className={styles.auditLabel}>Created:</span>
                    <span className={styles.auditValue}>
                        {formatDateReadable(todo.createdAt)}
                    </span>
                </div>

                {todo.updatedAt && (
                    <>
                        <span className={styles.separator}>|</span>
                        <div className={styles.auditRow}>
                            <ClockIcon className={styles.auditIcon} />
                            <span className={styles.auditLabel}>Updated:</span>
                            <span className={styles.auditValue}>
                                {formatDateReadable(todo.updatedAt)}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItemEdit;
