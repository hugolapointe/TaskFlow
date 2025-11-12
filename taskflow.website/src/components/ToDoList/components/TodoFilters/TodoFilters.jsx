/**
 * TodoFilters Component
 * Provides filtering controls for todo list (status, priority, sort order)
 */

import { useTodos } from '../../../../contexts/TodoContext';
import SelectInput from '../SelectInput';
import { FILTER_OPTIONS, STATUS_FILTER, PRIORITY_FILTER } from '../../../../constants';
import styles from './TodoFilters.module.css';

const TodoFilters = () => {
    const { filters, setStatusFilter, setPriorityFilter, setSortBy } = useTodos();

    // Convert filter values to select values
    const getStatusValue = () => {
        if (filters.isCompleted === undefined) return STATUS_FILTER.ALL;
        return filters.isCompleted ? STATUS_FILTER.COMPLETED : STATUS_FILTER.PENDING;
    };

    const getPriorityValue = () => {
        if (filters.isPriority === undefined) return PRIORITY_FILTER.ALL;
 return filters.isPriority ? PRIORITY_FILTER.PRIORITY : PRIORITY_FILTER.NON_PRIORITY;
    };

    return (
   <div className={styles.filterBar}>
      {/* Status Filter */}
   <SelectInput
     label="Status"
    value={getStatusValue()}
  onChange={(e) => setStatusFilter(e.target.value)}
       options={FILTER_OPTIONS.status}
     />
   
    {/* Priority Filter */}
 <SelectInput
  label="Priority"
           value={getPriorityValue()}
onChange={(e) => setPriorityFilter(e.target.value)}
    options={FILTER_OPTIONS.priority}
  />
          
 {/* Sort Order */}
  <SelectInput
  label="Sort by"
   value={filters.sortBy}
onChange={(e) => setSortBy(e.target.value)}
       options={FILTER_OPTIONS.sortBy}
            />
   </div>
    );
};

export default TodoFilters;
