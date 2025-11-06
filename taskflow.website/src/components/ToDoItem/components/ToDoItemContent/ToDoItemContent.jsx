import { ExclamationCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import styles from './ToDoItemContent.module.css';

const ToDoItemContent = ({ 
    todo, 
    isOverdue, 
    isEditing,
    editDescription,
    editDueDate,
    onDescriptionChange,
    onDueDateChange,
    onTogglePriority 
}) => {
    return (
        <div className={styles.leftSection}>
            <button
                onClick={onTogglePriority}
                className={styles.priorityButton}
                title={todo.isPriority ? 'Remove priority' : 'Mark as priority'}
            >
                <ExclamationCircleIcon className={`${styles.priorityIcon} ${todo.isPriority ? styles.active : styles.inactive}`} />
            </button>

            {isEditing ? (
                <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className={styles.descriptionInput}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                />
            ) : (
                <p className={`${styles.description} ${todo.isCompleted ? styles.completed : styles.active}`}>
                    {todo.description}
                </p>
            )}

            {isEditing ? (
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => onDueDateChange(e.target.value)}
                    className={styles.dueDateInput}
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                todo.dueDate && (
                    <div className={styles.dueDateContainer}>
                        <CalendarIcon className={styles.dueDateIcon} />
                        <span className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
                            {todo.dueDate}
                        </span>
                    </div>
                )
            )}
        </div>
    );
};

export default ToDoItemContent;
