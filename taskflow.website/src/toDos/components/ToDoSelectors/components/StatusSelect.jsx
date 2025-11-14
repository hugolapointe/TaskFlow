import { useFilters } from '../../../../hooks/useFilters';
import { STATUS_FILTERS } from '../../../../utils/constants';
import Select from '../../../../common/Select';

/**
 * StatusSelect component - Status filter selector
 */
const StatusSelect = () => {
  const { statusFilter, setStatusFilter } = useFilters();

  const options = [
    { value: STATUS_FILTERS.ALL, label: 'All tasks' },
    { value: STATUS_FILTERS.ACTIVE, label: 'Active' },
    { value: STATUS_FILTERS.COMPLETED, label: 'Completed' },
  ];

  return (
    <Select
      value={statusFilter}
      onChange={setStatusFilter}
      options={options}
    />
  );
};

export default StatusSelect;
