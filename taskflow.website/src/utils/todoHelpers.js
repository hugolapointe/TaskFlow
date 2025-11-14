/**
 * Fonctions utilitaires pour manipuler les todos et calculer les stats
 * Fonctions pures, faciles à tester
 */

/**
 * Met à jour un todo dans la liste
 */
export const updateTodoInList = (todos, todoId, updatedTodo) => {
    return todos.map(t => t.id === todoId ? updatedTodo : t);
};

/**
 * Retire un todo de la liste
 */
export const removeTodoFromList = (todos, todoId) => {
    return todos.filter(t => t.id !== todoId);
};

/**
 * Fonctions utilitaires génériques pour calculer les deltas de statistiques
 * Ces fonctions sont pures (sans side-effects) et faciles à tester
 */

/**
 * Calcule le delta des stats suite à un changement de priorité
 * @param {boolean} oldPriority - Ancienne valeur de priorité
 * @param {boolean} newPriority - Nouvelle valeur de priorité
 * @returns {Object|null} Delta des stats ou null si pas de changement
 */
export const calculatePriorityDelta = (oldPriority, newPriority) => {
 if (oldPriority === newPriority) return null;
    
    const delta = newPriority ? 1 : -1;
    
    return {
      priority: delta,
        nonPriority: -delta
    };
};

/**
 * Calcule le delta des stats suite à une complétion
 * @returns {Object} Delta des stats
 */
export const calculateCompletionDelta = () => {
    return {
        completed: 1
    };
};

/**
 * Calcule le delta des stats suite à une archive/suppression
 * @param {Object} item - L'item à archiver
 * @param {boolean} item.isPriority - Si l'item est prioritaire
 * @param {boolean} item.isCompleted - Si l'item est complété
 * @returns {Object} Delta des stats
 */
export const calculateArchiveDelta = (item) => {
    return {
total: -1,
      priority: item.isPriority ? -1 : 0,
        nonPriority: !item.isPriority ? -1 : 0,
        completed: item.isCompleted ? -1 : 0
    };
};

/**
 * Calcule le delta des stats suite à la création d'un item
 * @param {Object} item - Le nouvel item
 * @param {boolean} item.isPriority - Si l'item est prioritaire
 * @returns {Object} Delta des stats
 */
export const calculateCreationDelta = (item) => {
    return {
        total: 1,
        priority: item.isPriority ? 1 : 0,
nonPriority: !item.isPriority ? 1 : 0,
   completed: 0
    };
};
