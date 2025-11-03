import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
