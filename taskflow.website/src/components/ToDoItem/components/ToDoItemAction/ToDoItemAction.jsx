import { CheckCircleIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import styles from './ToDoItemAction.module.css';

const ToDoItemAction = ({ todo, onComplete, onArchive }) => {
    const handleClick = (e) => {
        e.stopPropagation();
if (todo.isCompleted) {
onArchive();
        } else {
            onComplete();
 }
    };

    return (
        <button
 onClick={handleClick}
       className={`${styles.actionButton} ${todo.isCompleted ? styles.completed : styles.active}`}
            title={todo.isCompleted ? 'Archive' : 'Complete'}
      >
          {todo.isCompleted ? (
      <ArchiveBoxIcon className={styles.actionIcon} />
   ) : (
     <CheckCircleIcon className={styles.actionIcon} />
)}
        </button>
    );
};

export default ToDoItemAction;
