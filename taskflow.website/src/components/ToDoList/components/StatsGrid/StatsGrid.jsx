import StatCard from './components/StatCard';
import styles from './StatsGrid.module.css';

const STAT_CONFIGS = [
    {
        type: 'total',
        label: 'Remaning',
        getValue: (stats) => stats.total,
        filters: { isCompleted: undefined, isPriority: undefined }
    },
    {
        type: 'priority',
        label: 'Priority',
        getValue: (stats) => stats.priority,
        filters: { isCompleted: false, isPriority: true }
    },
    {
        type: 'nonpriority',
        label: 'Non Priority',
        getValue: (stats) => stats.nonPriority,
        filters: { isCompleted: false, isPriority: false }
    },
    {
        type: 'completed',
        label: 'Completed',
        getValue: (stats) => stats.completed,
        filters: { isCompleted: true, isPriority: undefined }
    }
];

const StatsGrid = ({ stats, currentFilters, activeStatType, onFilterChange, onResetFilters }) => {
    const handleCardClick = (config) => {
        // If clicking on the already active card, reset to default filters
        if (config.type === activeStatType) {
            onResetFilters();

        } else {
            // Otherwise, apply the card's filters
            onFilterChange({ ...config.filters, sortBy: currentFilters.sortBy });
        }
    };

    return (
        <div className={styles.statsGrid}>
            {STAT_CONFIGS.map(config => (
                <StatCard
                    key={config.type}
                    label={config.label}
                    value={config.getValue(stats)}
                    type={config.type}
                    isActive={config.type === activeStatType}
                    onClick={() => handleCardClick(config)}
                />
            ))}
        </div>
    );
};

export default StatsGrid;
