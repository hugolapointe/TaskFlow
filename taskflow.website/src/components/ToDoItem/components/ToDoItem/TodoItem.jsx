/**
 * TodoItem Component
 * Displays a todo item in read-only mode
 * Shows description, due date, priority status, and action buttons
 */

import { memo } from 'react';
import { isOverdue } from '../../../../utils/dateUtils';
import {
    PencilIcon,
    ExclamationCircleIcon,
    CalendarIcon,
    CheckCircleIcon,
    ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import styles from './TodoItem.module.css';

const TodoItem = memo(({ todo, onEdit, onTogglePriority, onCompleteOrArchive }) => {
    const isTaskOverdue = isOverdue(todo.dueDate, todo.isCompleted);

    return (
        <div
            className={styles.container}
            data-completed={todo.isCompleted}
            data-priority={todo.isPriority}
        >
            <div className={styles.mainContent}>
                {/* Left Section: Priority + Content */}
                <div className={styles.leftSection}>
                    {/* Priority Button */}
                    <button
                        onClick={onTogglePriority}
                        className={styles.priorityButton}
                        title={todo.isPriority ? 'Remove priority' : 'Mark as priority'}
                        aria-label={todo.isPriority ? 'Remove priority' : 'Mark as priority'}
                    >
                        <ExclamationCircleIcon
                            className={`${styles.priorityIcon} ${todo.isPriority ? styles.active : styles.inactive
                                }`}
                        />
                    </button>

                    {/* Description */}
                    <p
                        className={`${styles.description} ${todo.isCompleted ? styles.completed : styles.active
                            }`}
                    >
                        {todo.description}
                    </p>

                    {/* Due Date */}
                    {todo.dueDate && (
                        <div className={styles.dueDateContainer}>
                            <CalendarIcon className={styles.dueDateIcon} />
                            <span
                                className={`${styles.dueDate} ${isTaskOverdue ? styles.overdue : ''
                                    }`}
                            >
                                {todo.dueDate}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right Section: Action Buttons */}
                <div className={styles.actionsContainer}>
                    {/* Edit Button */}
                    <button
                        onClick={onEdit}
                        className={styles.editButton}
                        title="Edit"
                        aria-label="Edit task"
                    >
                        <PencilIcon className={styles.actionIcon} />
                    </button>

                    {/* Complete/Archive Button */}
                    <button
                        onClick={onCompleteOrArchive}
                        className={`${styles.actionButton} ${todo.isCompleted ? styles.completed : styles.active
                            }`}
                        title={todo.isCompleted ? 'Archive' : 'Complete'}
                        aria-label={todo.isCompleted ? 'Archive task' : 'Complete task'}
                    >
                        {todo.isCompleted ? (
                            <ArchiveBoxIcon className={styles.actionIcon} />
                        ) : (
                            <CheckCircleIcon className={styles.actionIcon} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;
