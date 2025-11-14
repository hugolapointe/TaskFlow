import { createContext, useState } from 'react';
import { STATUS_FILTERS, PRIORITY_FILTERS, SORT_OPTIONS } from '../utils/constants';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS.ALL);
    const [priorityFilter, setPriorityFilter] = useState(PRIORITY_FILTERS.ALL);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.CREATED);

    const value = {
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        sortBy,
        setSortBy,
    };

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
