/**
 * Application Constants
 * Centralizes all magic strings and configuration values
 */

// Sort options for tasks
export const SORT_OPTIONS = {
    CREATED_AT: 'CreatedAt',
    DUE_DATE: 'DueDate'
};

// Status filter values
export const STATUS_FILTER = {
    ALL: 'all',
    PENDING: 'pending',
    COMPLETED: 'completed'
};

// Priority filter values
export const PRIORITY_FILTER = {
    ALL: 'all',
    PRIORITY: 'priority',
    NON_PRIORITY: 'nonpriority'
};

// Statistics card types
export const STAT_TYPES = {
    TOTAL: 'total',
    PRIORITY: 'priority',
    NON_PRIORITY: 'nonpriority',
    COMPLETED: 'completed'
};

// API configuration
export const API_BASE_URL = 'http://localhost:5154/api';

// Toast notification messages
export const TOAST_MESSAGES = {
    TODO_CREATED: 'Task created!',
    TODO_UPDATED: 'Task updated!',
    TODO_COMPLETED: 'Task completed!',
    TODO_REOPENED: 'Task reopened!',
    TODO_ARCHIVED: 'Task archived!',
    PRIORITY_UPDATED: 'Priority updated!',
    LOAD_ERROR: 'Failed to load tasks',
    CREATE_ERROR: 'Failed to create task',
    UPDATE_ERROR: 'Failed to update task',
    ARCHIVE_ERROR: 'Failed to archive task',
    PRIORITY_ERROR: 'Failed to update priority',
    STATUS_ERROR: 'Failed to update status'
};

// Filter options for UI dropdowns
export const FILTER_OPTIONS = {
    status: [
        { value: STATUS_FILTER.ALL, label: 'All' },
        { value: STATUS_FILTER.PENDING, label: 'Pending' },
        { value: STATUS_FILTER.COMPLETED, label: 'Completed' }
    ],
    priority: [
        { value: PRIORITY_FILTER.ALL, label: 'All' },
      { value: PRIORITY_FILTER.PRIORITY, label: 'Priority' },
        { value: PRIORITY_FILTER.NON_PRIORITY, label: 'Non Priority' }
    ],
    sortBy: [
        { value: SORT_OPTIONS.CREATED_AT, label: 'Created Date' },
        { value: SORT_OPTIONS.DUE_DATE, label: 'Due Date' }
    ]
};

// Default filter configuration
export const DEFAULT_FILTERS = {
    sortBy: SORT_OPTIONS.CREATED_AT,
    isPriority: undefined,
    isCompleted: false // Show only pending tasks by default
};

// Statistics configuration
export const STATS_CONFIG = [
  { 
        type: STAT_TYPES.TOTAL, 
      label: 'Remaining',
        getCount: (stats) => stats.total,
        filterValue: { isCompleted: undefined, isPriority: undefined }
    },
    { 
    type: STAT_TYPES.PRIORITY, 
 label: 'Priority',
        getCount: (stats) => stats.priority,
        filterValue: { isCompleted: false, isPriority: true }
    },
    { 
        type: STAT_TYPES.NON_PRIORITY, 
        label: 'Regular',
        getCount: (stats) => stats.nonPriority,
        filterValue: { isCompleted: false, isPriority: false }
    },
    { 
        type: STAT_TYPES.COMPLETED, 
    label: 'Completed',
   getCount: (stats) => stats.completed,
        filterValue: { isCompleted: true, isPriority: undefined }
    }
];
