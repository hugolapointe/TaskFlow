import axiosClient from '@api/axiosClient';

export const getToDos = async () => {
    const response = await axiosClient.get('/todos');
    return Array.isArray(response.data) ? response.data : (response.data.items || []);
};

export const getToDoById = async (id) => {
  const response = await axiosClient.get(`/todos/${id}`);
    return response.data;
};

export const createToDo = async (toDo) => {
    const response = await axiosClient.post('/todos', toDo);
    return response.data;
};

export const updateToDo = async (id, toDo) => {
    const response = await axiosClient.put(`/todos/${id}`, toDo);
    return response.data;
};

export const toggleToDoPriority = async (id) => {
    const response = await axiosClient.patch(`/todos/${id}/toggle-priority`);
    return response.data;
};

export const markToDoAsCompleted = async (id) => {
    const response = await axiosClient.patch(`/todos/${id}/mark-as-completed`);
    return response.data;
};

export const archiveToDo = async (id) => {
    const response = await axiosClient.delete(`/todos/${id}/archive`);
    return response.data;
};
