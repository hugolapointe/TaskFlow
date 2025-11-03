import StatCard from './components/StatCard';
import styles from './StatsGrid.module.css';

const STAT_TYPES = {
  TOTAL: 'total',
  PRIORITY: 'priority',
  NON_PRIORITY: 'nonpriority',
  COMPLETED: 'completed'
};

const createStatConfigs = (stats, sortBy) => [
  {
    type: STAT_TYPES.TOTAL,
    label: 'Total',
    value: stats.total,
    filters: {
    sortBy,
   isCompleted: undefined,
      isPriority: undefined
    }
  },
  {
type: STAT_TYPES.PRIORITY,
    label: 'Priority',
    value: stats.priority,
    filters: {
sortBy,
isCompleted: false,
      isPriority: true
    }
  },
  {
    type: STAT_TYPES.NON_PRIORITY,
    label: 'Non Priority',
    value: stats.nonPriority,
    filters: {
      sortBy,
      isCompleted: false,
      isPriority: false
    }
  },
  {
    type: STAT_TYPES.COMPLETED,
    label: 'Completed',
    value: stats.completed,
    filters: {
      sortBy,
      isCompleted: true,
      isPriority: undefined
    }
  }
];

const StatsGrid = ({ stats, currentFilters, activeStatType, onFilterChange }) => {
  const statConfigs = createStatConfigs(stats, currentFilters.sortBy);

  return (
    <div className={styles.statsGrid}>
      {statConfigs.map(config => (
      <StatCard
    key={config.type}
          label={config.label}
          value={config.value}
          type={config.type}
       isActive={config.type === activeStatType}
        onClick={() => onFilterChange(config.filters)}
   />
      ))}
    </div>
  );
};

export default StatsGrid;
