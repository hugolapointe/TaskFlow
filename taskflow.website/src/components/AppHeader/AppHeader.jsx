import TaskFlowIcon from '../TaskFlowIcon';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
      <div className={styles.iconAndTitle}>
    <TaskFlowIcon />
          <h1 className={styles.title}>TaskFlow</h1>
        </div>
        <span className={styles.separator}>|</span>
  <p className={styles.subtitle}>Get stuff done, one task at a time</p>
      </div>
    </header>
  );
};

export default AppHeader;
