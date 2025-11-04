import FilterSelect from '../../../FilterSelect';
import styles from './FilterBar.module.css';

const FilterBar = ({ filterState }) => {
  const { FILTER_OPTIONS } = filterState;
  
  const handleStatusChange = (value) => {
    const isCompleted = value === 'all' ? undefined : value === 'completed';
    filterState.updateFilter('isCompleted', isCompleted);
  };

  const handlePriorityChange = (value) => {
    const isPriority = value === 'all' ? undefined : value === 'priority';
    filterState.updateFilter('isPriority', isPriority);
  };

  const getStatusValue = () => {
    if (filterState.filters.isCompleted === undefined) return 'all';
    return filterState.filters.isCompleted ? 'completed' : 'pending';
  };

  const getPriorityValue = () => {
    if (filterState.filters.isPriority === undefined) return 'all';
    return filterState.filters.isPriority ? 'priority' : 'nonpriority';
  };

  return (
    <div className={styles.filterBar}>
      <FilterSelect
        label="Status"
        value={getStatusValue()}
        onChange={(e) => handleStatusChange(e.target.value)}
        options={FILTER_OPTIONS.status}
      />
      <FilterSelect
        label="Priority"
        value={getPriorityValue()}
        onChange={(e) => handlePriorityChange(e.target.value)}
        options={FILTER_OPTIONS.priority}
      />
      <FilterSelect
        label="Sort by"
        value={filterState.filters.sortBy}
        onChange={(e) => filterState.updateFilter('sortBy', e.target.value)}
        options={FILTER_OPTIONS.sortBy}
      />
    </div>
  );
};

export default FilterBar;
