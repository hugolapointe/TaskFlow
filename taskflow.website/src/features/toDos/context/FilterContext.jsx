import { createContext, useContext, useState } from 'react';
import { STATUS_FILTERS, PRIORITY_FILTERS, SORT_OPTIONS } from '@utils/constants';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS.ALL);
    const [priorityFilter, setPriorityFilter] = useState(PRIORITY_FILTERS.ALL);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.CREATED);

    return (
  <FilterContext.Provider value={{
          statusFilter,
       setStatusFilter,
    priorityFilter,
     setPriorityFilter,
       sortBy,
    setSortBy
     }}>
   {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
  if (!context) {
     throw new Error('useFilters must be used within a FilterProvider');
    }
  return context;
};
