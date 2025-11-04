export const formatDate = (date) => {
    if (!date) return null;

    return new Date(date).toISOString().split('T')[0];
};

export const isOverdue = (date, completed) => {
    if (!date || completed) return false;

    const today = new Date().toISOString().split('T')[0];

    return date < today;
};

export const updateInList = (list, id, item) => {
    return list.map(current => current.id === id ? item : current);
};

export const removeFromList = (list, id) => {
    return list.filter(item => item.id !== id);
};
