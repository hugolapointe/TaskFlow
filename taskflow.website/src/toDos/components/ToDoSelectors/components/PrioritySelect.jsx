import { useFilters } from '../../../../hooks/useFilters';
import { PRIORITY_FILTERS } from '../../../../utils/constants';
import Select from '../../../../common/Select';

/**
 * PrioritySelect component - Priority filter selector
 */
const PrioritySelect = () => {
  const { priorityFilter, setPriorityFilter } = useFilters();

  const options = [
    { value: PRIORITY_FILTERS.ALL, label: 'All priorities' },
    { value: PRIORITY_FILTERS.PRIORITY, label: 'Priority' },
    { value: PRIORITY_FILTERS.NON_PRIORITY, label: 'Non-priority' },
  ];

  return (
    <Select
      value={priorityFilter}
      onChange={setPriorityFilter}
      options={options}
    />
  );
};

export default PrioritySelect;
