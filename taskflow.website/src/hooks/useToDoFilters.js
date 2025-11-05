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
const DEFAULT_FILTERS = {
  sortBy: SORT_BY.CREATED_AT,
  isPriority: undefined,
  isCompleted: false // Show only pending tasks by default
};

// Map to determine active stat type
const STAT_TYPE_MAP = new Map([
  ['undefined-undefined', 'total'],
  ['false-true', 'priority'],
  ['false-false', 'nonpriority'],
  ['true-undefined', 'completed']
]);

export const useToDoFilters = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const replaceFilters = (newFilters) => {
    setFilters({ ...DEFAULT_FILTERS, ...newFilters });
  };

  const getActiveStatType = useMemo(() => {
    const key = `${filters.isCompleted}-${filters.isPriority}`;
    return STAT_TYPE_MAP.get(key) || null;
  }, [filters]);

  return {
    filters,
    updateFilter,
    replaceFilters,
    getActiveStatType,
    FILTER_OPTIONS
  };
};
