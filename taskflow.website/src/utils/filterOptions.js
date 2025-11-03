import { SORT_BY } from './constants';

export const FILTER_OPTIONS = {
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
