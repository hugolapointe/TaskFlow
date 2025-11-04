import axios from 'axios';

const API_BASE_URL = 'http://localhost:5154/api';

const toDoApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToDos = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.isPriority !== undefined) params.append('isPriority', filters.isPriority);
  if (filters.isCompleted !== undefined) params.append('isCompleted', filters.isCompleted);
  
  const url = `/todos${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await toDoApi.get(url);
  return response.data;
};

export const getStats = async () => {
  const response = await toDoApi.get('/todos/stats');
  return response.data;
};

export const getToDoById = async (id) => {
  const response = await toDoApi.get(`/todos/${id}`);
  return response.data;
};

export const createToDo = async (toDo) => {
  const response = await toDoApi.post('/todos', {
    description: toDo.description,
    dueDate: toDo.dueDate || null,
    isPriority: toDo.isPriority || false,
  });
  return response.data;
};

export const updateToDo = async (id, toDo) => {
  const response = await toDoApi.put(`/todos/${id}`, {
    description: toDo.description,
    dueDate: toDo.dueDate || null,
    isPriority: toDo.isPriority || false
  });
  return response.data;
};

export const toggleToDoPriority = async (id) => {
  const response = await toDoApi.patch(`/todos/${id}/toggle-priority`);
  return response.data;
};

export const markToDoAsCompleted = async (id) => {
  const response = await toDoApi.patch(`/todos/${id}/mark-as-completed`);
  return response.data;
};

export const archiveToDo = async (id) => {
  await toDoApi.delete(`/todos/${id}/archive`);
};

export default toDoApi;
