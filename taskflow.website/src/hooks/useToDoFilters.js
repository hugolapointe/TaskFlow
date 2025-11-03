import { useState, useMemo } from 'react';

const SORT_BY = {
  CREATED_AT: 'CreatedAt',
  DUE_DATE: 'DueDate'
};

const FILTER_OPTIONS = {
  status: [
    { value: 'all', label: 'All' },
    { value: 'false', label: 'Pending' },
    { value: 'true', label: 'Completed' }
  ],
  priority: [
    { value: 'all', label: 'All' },
    { value: 'priority', label: 'Priority Only' },
    { value: 'nonpriority', label: 'Non Priority Only' }
  ],
  sortBy: [
    { value: SORT_BY.CREATED_AT, label: 'Created Date' },
    { value: SORT_BY.DUE_DATE, label: 'Due Date' }
  ]
};

const parseFilterValue = (value, type) => {
  if (value === 'all') return undefined;
  if (type === 'boolean') return value === 'true';
  if (type === 'priority') {
    if (value === 'priority') return true;
    if (value === 'nonpriority') return false;
    return undefined;
  }
  return value;
};

const DEFAULT_FILTERS = {
  sortBy: SORT_BY.CREATED_AT,
  isPriority: undefined,
  isCompleted: undefined
};

export const useToDoFilters = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const replaceFilters = (newFilters) => {
    setFilters({ ...DEFAULT_FILTERS, ...newFilters });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const getStatusValue = () => {
    return filters.isCompleted === undefined 
      ? 'all' 
      : filters.isCompleted.toString();
  };

  const getPriorityValue = () => {
    if (filters.isPriority === undefined) return 'all';
    return filters.isPriority === true ? 'priority' : 'nonpriority';
  };

  const getActiveStatType = useMemo(() => {
    const { isCompleted, isPriority } = filters;
    
    if (isCompleted === undefined && isPriority === undefined) return 'total';
    if (isCompleted === false && isPriority === true) return 'priority';
    if (isCompleted === false && isPriority === false) return 'nonpriority';
    if (isCompleted === true && isPriority === undefined) return 'completed';
    
    return null;
  }, [filters]);

  return {
    filters,
    updateFilter,
    replaceFilters,
    resetFilters,
    getStatusValue,
    getPriorityValue,
    getActiveStatType,
    FILTER_OPTIONS,
    parseFilterValue
  };
};
