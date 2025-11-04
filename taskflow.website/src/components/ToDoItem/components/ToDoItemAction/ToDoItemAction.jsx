import { CheckCircleIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import styles from './ToDoItemAction.module.css';

const ToDoItemAction = ({ todo, onComplete }) => {
    return (
  <button
      onClick={(e) => {
       e.stopPropagation();
onComplete();
       }}
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
