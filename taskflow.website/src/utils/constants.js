export const FILTER_VALUES = {
  ALL: 'all',
  PRIORITY: 'priority',
  NON_PRIORITY: 'nonpriority',
  PENDING: 'false',
  COMPLETED: 'true'
};

export const STAT_TYPES = {
  TOTAL: 'total',
  PRIORITY: 'priority',
  NON_PRIORITY: 'nonpriority',
  COMPLETED: 'completed'
};

export const SORT_BY = {
  CREATED_AT: 'CreatedAt',
  DUE_DATE: 'DueDate'
};

export const parseFilterValue = (value, type) => {
  if (value === 'all') return undefined;
  if (type === 'boolean') return value === 'true';
  if (type === 'priority') {
    if (value === 'priority') return true;
    if (value === 'nonpriority') return false;
    return undefined;
  }
  return value;
};
