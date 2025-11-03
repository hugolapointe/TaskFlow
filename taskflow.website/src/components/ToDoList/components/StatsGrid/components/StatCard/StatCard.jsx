import styles from './StatCard.module.css';

const StatCard = ({ label, value, isActive, onClick, type }) => {
  const cardClasses = [
    styles.card,
    styles[type],
    isActive ? styles.active : styles.inactive
  ].join(' ');

  return (
    <button onClick={onClick} className={cardClasses}>
    <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </button>
  );
};

export default StatCard;
