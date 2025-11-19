import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5154/api/todos"
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        return Promise.reject(error);
    }
);

export default api;
