import styles from './EmptyState.module.css';

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path 
strokeLinecap="round" 
  strokeLinejoin="round" 
 strokeWidth={2} 
     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
        />
      </svg>
      <p className={styles.title}>{title}</p>
 <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default EmptyState;
