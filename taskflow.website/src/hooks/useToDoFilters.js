import { useState, useMemo } from 'react';

const SORT_BY = {
  CREATED_AT: 'CreatedAt',
  DUE_DATE: 'DueDate'
};

const FILTER_OPTIONS = {
  status: [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ],
  priority: [
    { value: 'all', label: 'All' },
    { value: 'priority', label: 'Priority' },
    { value: 'nonpriority', label: 'Non Priority' }
  ],
  sortBy: [
    { value: SORT_BY.CREATED_AT, label: 'Created Date' },
    { value: SORT_BY.DUE_DATE, label: 'Due Date' }
  ]
};

// Default filter: show only pending tasks
export const DEFAULT_FILTERS = {
  sortBy: SORT_BY.CREATED_AT,
  isPriority: undefined,
  isCompleted: false
};

// Helper to determine active stat type based on filters
const getStatTypeFromFilters = (isCompleted, isPriority) => {
  if (isCompleted === true) return 'completed';
  if (isPriority === true) return 'priority';
  if (isPriority === false) return 'nonpriority';
  return 'total';
};

export const useToDoFilters = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const replaceFilters = (newFilters) => {
    setFilters({ ...DEFAULT_FILTERS, ...newFilters });
  };

  const resetToDefault = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const getActiveStatType = useMemo(() => {
    return getStatTypeFromFilters(filters.isCompleted, filters.isPriority);
  }, [filters.isCompleted, filters.isPriority]);

  return {
    filters,
    updateFilter,
    replaceFilters,
    resetToDefault,
    getActiveStatType,
    FILTER_OPTIONS
  };
};
