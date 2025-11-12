/**
 * Date utility functions
 * Provides consistent date formatting and manipulation across the application
 */

/**
 * Formats a date to YYYY-MM-DD format
 * @param {string|Date} date - The date to format
 * @returns {string|null} Formatted date string or null if invalid
 */
export const formatDate = (date) => {
    if (!date) return null;
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toISOString().split('T')[0];
    } catch (error) {
        console.error('Invalid date:', date);
        return null;
    }
};

/**
 * Formats a date in a human-readable format (e.g., "15 Jan 2024")
 * @param {string|Date} date - The date to format
 * @returns {string} Human-readable date string
 */
export const formatDateReadable = (date) => {
    if (!date) return '';
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
     return dateObj.toLocaleDateString('en-US', {
       day: 'numeric',
         month: 'short',
    year: 'numeric'
        });
    } catch (error) {
        return '';
    }
};

/**
 * Gets today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Checks if a task is overdue
 * @param {string} dueDate - The due date to check
 * @param {boolean} isCompleted - Whether the task is completed
 * @returns {boolean} True if the task is overdue
 */
export const isOverdue = (dueDate, isCompleted) => {
    if (!dueDate || isCompleted) return false;
 
    const today = getTodayDate();
    return dueDate < today;
};

/**
 * Checks if a date is today
 * @param {string} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
    if (!date) return false;
 return date === getTodayDate();
};

/**
 * Calculates the number of days until a target date
 * @param {string} date - The target date
 * @returns {number|null} Number of days (negative if in the past)
 */
export const daysUntil = (date) => {
    if (!date) return null;
    
    const today = new Date(getTodayDate());
    const target = new Date(date);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
};
