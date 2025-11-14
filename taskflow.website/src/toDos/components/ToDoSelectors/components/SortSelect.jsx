import { useFilters } from '../../../../hooks/useFilters';
import { SORT_OPTIONS } from '../../../../utils/constants';
import Select from '../../../../common/inputs/Select';

const SortSelect = () => {
    const { sortBy, setSortBy } = useFilters();

    const options = [
        { value: SORT_OPTIONS.CREATED, label: 'Created date' },
        { value: SORT_OPTIONS.DUE_DATE, label: 'Due date' },
    ];

    return (
        <Select
            value={sortBy}
            onChange={setSortBy}
            options={options}
        />
    );
};

export default SortSelect;
