import { ExclamationCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import styles from './ToDoItemContent.module.css';

const ToDoItemContent = ({ todo, isOverdue, onTogglePriority }) => {
    return (
        <div className={styles.leftSection}>
            <button
                onClick={onTogglePriority}
                className={styles.priorityButton}
                title={todo.isPriority ? 'Remove priority' : 'Mark as priority'}
            >
                <ExclamationCircleIcon className={`${styles.priorityIcon} ${todo.isPriority ? styles.active : styles.inactive}`} />
            </button>

            <p className={`${styles.description} ${todo.isCompleted ? styles.completed : styles.active}`}>
                {todo.description}
            </p>

            {todo.dueDate && (
                <div className={styles.dueDateContainer}>
                    <CalendarIcon className={styles.dueDateIcon} />
                    <span className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
                        {todo.dueDate}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ToDoItemContent;
