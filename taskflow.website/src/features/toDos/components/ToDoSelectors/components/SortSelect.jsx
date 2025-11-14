import { useFilters } from '../../../context/FilterContext';
import { SORT_OPTIONS } from '@utils/constants';
import Select from '@common/inputs/Select';

const SortSelect = () => {
  const { sortBy, setSortBy } = useFilters();

  const handleChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <Select
 value={sortBy}
      onChange={handleChange}
 options={[
     { value: SORT_OPTIONS.CREATED, label: 'Sort by Created' },
    { value: SORT_OPTIONS.DUE_DATE, label: 'Sort by Due Date' }
  ]}
      />
    );
};

export default SortSelect;
