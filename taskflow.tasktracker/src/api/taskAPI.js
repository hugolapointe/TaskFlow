import api from './axiosConfig';

export const taskAPI = {
    getAll: () => api.get('/').then(res => res.data.items || []),

    create: (task) => api.post('/', task).then(res => res.data),

    archive: (id) => api.delete(`/${id}/archive`),

    togglePriority: (id) => api.patch(`/${id}/toggle-priority`).then(res => res.data)
};
