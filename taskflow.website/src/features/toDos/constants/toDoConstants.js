export const STATUS_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
};

export const PRIORITY_FILTERS = {
    ALL: 'all',
    PRIORITY: 'priority',
    NON_PRIORITY: 'non-priority',
};

export const SORT_OPTIONS = {
    CREATED: 'created',
    DUE_DATE: 'dueDate',
};

export const SUCCESS_MESSAGES = {
    CREATE: 'Task created successfully!',
    UPDATE: 'Task updated!',
    COMPLETE: 'Task completed!',
    ARCHIVE: 'Task archived!',
    TOGGLE_PRIORITY: 'Priority updated!',
};

export const ERROR_MESSAGES = {
    CREATE: 'Oops! Could not create task',
    UPDATE: 'Oops! Could not update task',
    COMPLETE: 'Oops! Could not complete task',
    ARCHIVE: 'Oops! Could not archive task',
    TOGGLE_PRIORITY: 'Oops! Could not update priority',
    LOAD: 'Oops! Could not load tasks',
};

export const VALIDATION_MESSAGES = {
    DESCRIPTION_REQUIRED: 'Description is required',
};
