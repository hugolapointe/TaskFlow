import FilterSelect from '../../../FilterSelect';
import styles from './FilterBar.module.css';

const FilterBar = ({ filterState }) => {
  const { parseFilterValue, FILTER_OPTIONS } = filterState;
  
  const filters = [
    {
      label: 'Status',
      value: filterState.getStatusValue(),
      onChange: (e) => {
        const value = parseFilterValue(e.target.value, 'boolean');
        filterState.updateFilter('isCompleted', value);
      },
      options: FILTER_OPTIONS.status
    },
    {
      label: 'Priority',
      value: filterState.getPriorityValue(),
      onChange: (e) => {
        const value = parseFilterValue(e.target.value, 'priority');
        filterState.updateFilter('isPriority', value);
      },
      options: FILTER_OPTIONS.priority
    },
    {
      label: 'Sort by',
      value: filterState.filters.sortBy,
      onChange: (e) => filterState.updateFilter('sortBy', e.target.value),
      options: FILTER_OPTIONS.sortBy
    }
  ];

  return (
    <div className={styles.filterBar}>
      {filters.map(filter => (
        <FilterSelect
          key={filter.label}
          {...filter}
        />
      ))}
    </div>
  );
};

export default FilterBar;
