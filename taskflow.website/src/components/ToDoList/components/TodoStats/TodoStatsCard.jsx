/**
 * TodoStatsCard Component
 * Individual statistic card showing a count and label
 * Clickable to filter todos by that statistic
 */

import styles from './TodoStatsCard.module.css';

const TodoStatsCard = ({ type, label, count, isActive, onClick }) => {
    return (
      <button
            onClick={onClick}
 className={styles.card}
            data-type={type}
            data-active={isActive}
    aria-label={`${label}: ${count} tasks`}
            aria-pressed={isActive}
        >
<p className={styles.count}>{count}</p>
  <p className={styles.label}>{label}</p>
        </button>
    );
};

export default TodoStatsCard;
