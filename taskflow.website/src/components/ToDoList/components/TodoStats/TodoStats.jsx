/**
 * TodoStats Component
 * Displays statistics cards for todos (total, priority, regular, completed)
 * Cards are clickable to filter the todo list
 */

import { useTodos } from '../../../../contexts/TodoContext';
import TodoStatsCard from './TodoStatsCard';
import { STATS_CONFIG } from '../../../../constants';
import styles from './TodoStats.module.css';

const TodoStats = () => {
    const { stats, filters, applyFilters, resetFilters, getActiveStatType } = useTodos();
    
    // Determine which card is currently active based on filters
    const activeType = getActiveStatType();

    /**
     * Handles clicking on a stat card
     * If the card is already active, reset filters
  * Otherwise, apply that card's filters
     */
    const handleCardClick = (config) => {
        if (config.type === activeType) {
        // Clicking active card resets all filters
  resetFilters();
      } else {
     // Apply the card's filters while preserving the current sort order
 applyFilters({ 
        ...config.filterValue, 
    sortBy: filters.sortBy 
         });
 }
    };

    return (
        <div className={styles.grid}>
       {STATS_CONFIG.map(config => (
   <TodoStatsCard
       key={config.type}
   type={config.type}
      label={config.label}
     count={config.getCount(stats)}
     isActive={config.type === activeType}
   onClick={() => handleCardClick(config)}
  />
     ))}
        </div>
    );
};

export default TodoStats;
