import { ClockIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../../../utils/todoUtils';
import styles from './ToDoItemAudit.module.css';

const ToDoItemAudit = ({ todo }) => {
  return (
    <div className={styles.auditSection}>
      <div className={styles.auditRow}>
        <ClockIcon className={styles.auditIcon} />
        <span className={styles.auditLabel}>Created:</span>
  <span className={styles.auditValue}>{formatDate(todo.createdAt)}</span>
      </div>

      {todo.updatedAt && (
        <>
          <span className={styles.separator}>|</span>
          <div className={styles.auditRow}>
   <ClockIcon className={styles.auditIcon} />
            <span className={styles.auditLabel}>Updated:</span>
         <span className={styles.auditValue}>{formatDate(todo.updatedAt)}</span>
          </div>
 </>
   )}
    </div>
  );
};

export default ToDoItemAudit;
