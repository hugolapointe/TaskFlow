import StatCard from './components/StatCard';
import { createStatConfigs } from '../../../../utils/statConfigs';
import styles from './StatsGrid.module.css';

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
