import axios from 'axios';

const API_BASE_URL = 'http://localhost:5154/api';

const todoApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.isPriority !== undefined) params.append('isPriority', filters.isPriority);
  if (filters.isCompleted !== undefined) params.append('isCompleted', filters.isCompleted);
  
  const url = `/todos${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await todoApi.get(url);
  return response.data;
};

export const getStats = async () => {
  const response = await todoApi.get('/todos/stats');
  return response.data;
};

export const getTodoById = async (id) => {
  const response = await todoApi.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await todoApi.post('/todos', {
    description: todo.description,
    dueDate: todo.dueDate || null,
    isPriority: todo.isPriority || false,
  });
  return response.data;
};

export const updateTodoDescription = async (id, description) => {
  const response = await todoApi.put(`/todos/${id}/description`, {
    value: description,
  });
  return response.data;
};

export const updateTodoDueDate = async (id, dueDate) => {
  const response = await todoApi.put(`/todos/${id}/due-date`, {
    value: dueDate,
  });
  return response.data;
};

export const toggleTodoPriority = async (id) => {
  const response = await todoApi.patch(`/todos/${id}/toggle-priority`);
  return response.data;
};

export const toggleTodoComplete = async (id) => {
  const response = await todoApi.patch(`/todos/${id}/toggle-complete`);
  return response.data;
};

export const archiveTodo = async (id) => {
  await todoApi.delete(`/todos/${id}/archive`);
};

export default todoApi;
