import styles from './StatCard.module.css';

const StatCard = ({ label, value, isActive, onClick, type }) => {
    return (
        <button
            onClick={onClick}
            className={styles.card}
            data-type={type}
            data-active={isActive}
        >
            <p className={styles.value}>{value}</p>
            <p className={styles.label}>{label}</p>
        </button>
    );
};

export default StatCard;
