import { useFilters } from '../../../context/FilterContext';
import { SORT_OPTIONS } from '../../../constants/toDoConstants';
import Select from '@common/inputs/Select';

const SortSelect = () => {
  const { sortBy, setSortBy } = useFilters();

    const handleChange = (value) => {
        setSortBy(value);
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
