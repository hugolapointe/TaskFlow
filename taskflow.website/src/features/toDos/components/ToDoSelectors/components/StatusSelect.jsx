import { useFilters } from '../../../context/FilterContext';
import { STATUS_FILTERS } from '../../../constants/toDoConstants';
import Select from '@common/inputs/Select';

const StatusSelect = () => {
    const { statusFilter, setStatusFilter } = useFilters();

    const handleChange = (value) => {
        setStatusFilter(value);
    };

    return (
        <Select
            value={statusFilter}
            onChange={handleChange}
 options={[
     { value: STATUS_FILTERS.ALL, label: 'All Tasks' },
         { value: STATUS_FILTERS.ACTIVE, label: 'Active Only' },
       { value: STATUS_FILTERS.COMPLETED, label: 'Completed Only' }
     ]}
      />
  );
};

export default StatusSelect;
