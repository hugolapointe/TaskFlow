import { memo } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { formatDate, formatTimestamp, isOverdue } from '../../utils/toDoUtils';
import { StarIcon, CalendarIcon, CheckCircleIcon, ArchiveBoxIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import styles from './ToDoItem.module.css';

const ToDoItem = memo(({ toDo }) => {
    const { selectToDo, selectedToDo, markAsComplete, archiveToDo, changePriority } = useToDos();

    const handleEdit = () => {
        selectToDo(toDo);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAction = () => {
        if (toDo.isCompleted) {
            if (window.confirm('Archive this task permanently?')) {
                archiveToDo(toDo.id);
            }
        } else {
            markAsComplete(toDo.id);
        }
    };

    const handlePriorityToggle = (e) => {
        e.stopPropagation();
        changePriority(toDo.id);
    };

    const isSelected = selectedToDo?.id === toDo.id;
    const isTaskOverdue = isOverdue(toDo.dueDate, toDo.isCompleted);

    const getContainerClass = () => {
        if (isSelected) return `${styles.container} ${styles.selected}`;
        if (toDo.isCompleted) return `${styles.container} ${styles.completed}`;
        if (toDo.isPriority) return `${styles.container} ${styles.priority}`;
        return `${styles.container} ${styles.default}`;
    };

    return (
        <div className={getContainerClass()} onClick={handleEdit}>
            <div className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <button
                        onClick={handlePriorityToggle}
                        className={styles.priorityButton}
                        title={toDo.isPriority ? 'Remove priority' : 'Mark as priority'}
                    >
                        {toDo.isPriority ? (
                            <StarIconSolid className={`${styles.priorityIcon} ${styles.active}`} />
                        ) : (
                            <StarIcon className={`${styles.priorityIcon} ${styles.inactive}`} />
                        )}
                    </button>

                    <p className={`${styles.description} ${toDo.isCompleted ? styles.completed : styles.active}`}>
                        {toDo.description}
                    </p>

                    {toDo.dueDate && (
                        <div className={styles.dueDateContainer}>
                            <CalendarIcon className={styles.dueDateIcon} />
                            <span className={`${styles.dueDate} ${isTaskOverdue ? styles.overdue : ''}`}>
                                {formatDate(toDo.dueDate)}
                            </span>
                        </div>
                    )}
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAction();
                    }}
                    className={`${styles.actionButton} ${toDo.isCompleted ? styles.completed : styles.active}`}
                    title={toDo.isCompleted ? 'Archive' : 'Complete'}
                >
                    {toDo.isCompleted ? (
                        <ArchiveBoxIcon className={styles.actionIcon} />
                    ) : (
                        <CheckCircleIcon className={styles.actionIcon} />
                    )}
                </button>
            </div>

            {isSelected && (
                <div className={styles.auditSection}>
                    <div className={styles.auditRow}>
                        <ClockIcon className={styles.auditIcon} />
                        <span className={styles.auditLabel}>Created:</span>
                        <span className={styles.auditValue}>{formatTimestamp(toDo.createdAt)}</span>
                    </div>

                    {toDo.updatedAt && (
                        <>
                            <span className={styles.separator}>|</span>
                            <div className={styles.auditRow}>
                                <ClockIcon className={styles.auditIcon} />
                                <span className={styles.auditLabel}>Updated:</span>
                                <span className={styles.auditValue}>{formatTimestamp(toDo.updatedAt)}</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
});

ToDoItem.displayName = 'ToDoItem';

export default ToDoItem;
