import { useFilters } from '../../../context/FilterContext';
import { PRIORITY_FILTERS } from '../../../constants/toDoConstants';
import Select from '@common/inputs/Select';

const PrioritySelect = () => {
    const { priorityFilter, setPriorityFilter } = useFilters();

    const handleChange = (value) => {
        setPriorityFilter(value);
    };

    return (
        <Select
            value={priorityFilter}
            onChange={handleChange}
            options={[
                { value: PRIORITY_FILTERS.ALL, label: 'All Priority' },
                { value: PRIORITY_FILTERS.PRIORITY, label: 'Priority Only' },
                { value: PRIORITY_FILTERS.NON_PRIORITY, label: 'Regular Only' }
            ]}
        />
    );
};

export default PrioritySelect;
