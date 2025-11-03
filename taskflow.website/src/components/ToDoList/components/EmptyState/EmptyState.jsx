import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import styles from './EmptyState.module.css';

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <ClipboardDocumentListIcon className={styles.icon} />
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default EmptyState;
