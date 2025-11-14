export const updateItemInList = (items, itemId, updatedItem) => {
    return items.map(item => item.id === itemId ? updatedItem : item);
};

export const removeItemFromList = (items, itemId) => {
    return items.filter(item => item.id !== itemId);
};

export const prependItemToList = (items, newItem) => {
    return [newItem, ...items];
};

export const appendItemToList = (items, newItem) => {
    return [...items, newItem];
};
