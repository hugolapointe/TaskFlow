export const formatDate = (dateString) => {
  if (!dateString) return null;
  return dateString;
};

export const formatTimestamp = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isOverdue = (dateString, isCompleted) => {
  if (!dateString || isCompleted) return false;
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return dateString < todayStr;
};

export const updateToDoInList = (toDos, id, updatedToDo) => {
  return toDos.map(toDo => toDo.id === id ? updatedToDo : toDo);
};

export const removeToDoFromList = (toDos, id) => {
  return toDos.filter(toDo => toDo.id !== id);
};
