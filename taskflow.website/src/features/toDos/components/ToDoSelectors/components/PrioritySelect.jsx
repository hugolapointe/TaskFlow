import { useFilters } from '@hooks/useFilters';
import { PRIORITY_FILTERS } from '@utils/constants';
import Select from '@common/inputs/Select';


const PrioritySelect = () => {
    const { priorityFilter, setPriorityFilter } = useFilters();

    const handleChange = (e) => {
        setPriorityFilter(e.target.value);
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
