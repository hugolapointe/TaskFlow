export const formatDate = (dateString) => {
  if (!dateString) return null;
const date = new Date(dateString);
  return date.toLocaleDateString('en-CA');
};

export const isOverdue = (dateString, isCompleted) => {
  if (!dateString || isCompleted) return false;
  const dueDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate < today;
};

export const updateTodoInList = (todos, id, updatedTodo) => {
  return todos.map(todo => todo.id === id ? updatedTodo : todo);
};

export const removeTodoFromList = (todos, id) => {
  return todos.filter(todo => todo.id !== id);
};

export const parseFilterValue = (value, type) => {
  if (value === 'all') return undefined;
  if (type === 'boolean') return value === 'true';
  if (type === 'priority') return value === 'priority';
  return value;
};

export const getFilterDisplayValue = (filterValue) => {
  if (filterValue === undefined) return 'all';
  if (typeof filterValue === 'boolean') return filterValue.toString();
  return filterValue ? 'priority' : 'nonpriority';
};
