import axiosClient from './axiosClient';

/**
 * API Client pour les ToDos
 * Endpoints disponibles pour gérer les tâches
 */

/**
 * Récupère toutes les tâches
 * @returns {Promise} Liste des tâches
 */
export const getToDos = async () => {
  const response = await axiosClient.get('/todos');
  // L'API retourne { items: [...] }
  return Array.isArray(response.data) ? response.data : (response.data.items || []);
};

/**
 * Récupère une tâche par son ID
 * @param {number} id - ID de la tâche
 * @returns {Promise} Tâche trouvée
 */
export const getToDoById = async (id) => {
  const response = await axiosClient.get(`/todos/${id}`);
  return response.data;
};

/**
 * Récupère les statistiques des tâches
 * @returns {Promise} Statistiques (total, priority, nonPriority, completed)
 */
export const getToDoStats = async () => {
  const response = await axiosClient.get('/todos/stats');
  return response.data;
};

/**
 * Crée une nouvelle tâche
 * @param {Object} toDo - { description, dueDate?, isPriority }
 * @returns {Promise} Tâche créée
 */
export const createToDo = async (toDo) => {
  const response = await axiosClient.post('/todos', toDo);
  return response.data;
};

/**
 * Met à jour une tâche
 * @param {number} id - ID de la tâche
 * @param {Object} toDo - { description, dueDate?, isPriority }
 * @returns {Promise} Tâche mise à jour
 */
export const updateToDo = async (id, toDo) => {
  const response = await axiosClient.put(`/todos/${id}`, toDo);
  return response.data;
};

/**
 * Bascule la priorité d'une tâche
 * @param {number} id - ID de la tâche
 * @returns {Promise} Tâche mise à jour
 */
export const toggleToDoPriority = async (id) => {
  const response = await axiosClient.patch(`/todos/${id}/toggle-priority`);
  return response.data;
};

/**
 * Marque une tâche comme complétée
 * @param {number} id - ID de la tâche
 * @returns {Promise} Tâche mise à jour
 */
export const markToDoAsCompleted = async (id) => {
  const response = await axiosClient.patch(`/todos/${id}/mark-as-completed`);
  return response.data;
};

/**
 * Archive (supprime) une tâche
 * @param {number} id - ID de la tâche
 * @returns {Promise} Confirmation de suppression
 */
export const archiveToDo = async (id) => {
  const response = await axiosClient.delete(`/todos/${id}/archive`);
  return response.data;
};
