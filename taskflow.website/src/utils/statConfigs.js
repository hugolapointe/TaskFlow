import { STAT_TYPES } from './constants';

export const createStatConfigs = (stats, sortBy) => [
  {
    type: STAT_TYPES.TOTAL,
    label: 'Total',
    value: stats.total,
    filters: {
      sortBy,
      isCompleted: undefined,
 isPriority: undefined
    }
  },
  {
    type: STAT_TYPES.PRIORITY,
    label: 'Priority',
    value: stats.priority,
    filters: {
      sortBy,
      isCompleted: false,
 isPriority: true
    }
  },
  {
    type: STAT_TYPES.NON_PRIORITY,
 label: 'Non Priority',
    value: stats.nonPriority,
    filters: {
      sortBy,
 isCompleted: false,
      isPriority: false
    }
  },
  {
    type: STAT_TYPES.COMPLETED,
 label: 'Completed',
    value: stats.completed,
    filters: {
      sortBy,
      isCompleted: true,
  isPriority: undefined
    }
  }
];
