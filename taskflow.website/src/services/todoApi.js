import axios from 'axios';

const API_BASE_URL = 'http://localhost:5154/api';

const todoApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour logger les requêtes
todoApi.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor pour logger les réponses
todoApi.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// GET /api/todos - Récupérer tous les todos avec filtres optionnels
export const getTodos = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.isPriority !== undefined) params.append('isPriority', filters.isPriority);
  if (filters.isCompleted !== undefined) params.append('isCompleted', filters.isCompleted);
  
  const url = `/todos${params.toString() ? `?${params.toString()}` : ''}`;
  console.log('📋 Fetching todos with URL:', url);
  
  const response = await todoApi.get(url);
  return response.data;
};

// GET /api/todos/:id - Récupérer un todo par ID
export const getTodoById = async (id) => {
  const response = await todoApi.get(`/todos/${id}`);
  return response.data;
};

// POST /api/todos - Créer un nouveau todo
export const createTodo = async (todo) => {
  console.log('➕ Creating todo:', todo);
  const response = await todoApi.post('/todos', {
    description: todo.description,
    dueDate: todo.dueDate || null,
    isPriority: todo.isPriority || false,
  });
  return response.data;
};

// PUT /api/todos/:id/description - Mettre à jour la description
export const updateTodoDescription = async (id, description) => {
  const response = await todoApi.put(`/todos/${id}/description`, {
    value: description,
  });
  return response.data;
};

// PUT /api/todos/:id/due-date - Mettre à jour la date d'échéance
export const updateTodoDueDate = async (id, dueDate) => {
  const response = await todoApi.put(`/todos/${id}/due-date`, {
    value: dueDate,
  });
  return response.data;
};

// PATCH /api/todos/:id/toggle-priority - Basculer la priorité
export const toggleTodoPriority = async (id) => {
  const response = await todoApi.patch(`/todos/${id}/toggle-priority`);
  return response.data;
};

// PATCH /api/todos/:id/toggle-complete - Basculer le statut complété
export const toggleTodoComplete = async (id) => {
  const response = await todoApi.patch(`/todos/${id}/toggle-complete`);
  return response.data;
};

// DELETE /api/todos/:id - Archiver (supprimer) un todo
export const deleteTodo = async (id) => {
  await todoApi.delete(`/todos/${id}`);
};

export default todoApi;
