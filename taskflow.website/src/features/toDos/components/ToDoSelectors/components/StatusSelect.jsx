import { useFilters } from '../../../../../hooks/useFilters';
import { STATUS_FILTERS } from '../../../../../utils/constants';
import Select from '../../../../../common/inputs/Select';

const StatusSelect = () => {
    const { statusFilter, setStatusFilter } = useFilters();

    const handleChange = (e) => {
        setStatusFilter(e.target.value);
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
