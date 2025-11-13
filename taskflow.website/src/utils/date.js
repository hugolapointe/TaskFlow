/**
 * Format a date to YYYY-MM-DD
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Format a date for display (short format: YYYY-MM-DD)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date for display
 */
export const formatDateForDisplay = (date) => {
  if (!date) return '';
  return formatDate(date);
};

/**
 * Check if a date is overdue
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if the date is overdue
 */
export const isOverdue = (date) => {
  if (!date) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  );
};
