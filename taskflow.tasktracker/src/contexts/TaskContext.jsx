import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../config';

export const TaskContext = createContext();

const api = axios.create({
    baseURL: config.apiBaseUrl
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

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching tasks from:', api.defaults.baseURL);
            const res = await api.get('/');
            console.log('Tasks response:', res.data);
            setTasks(res.data.items || []);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        const payload = {
            description: task.description,
            dueDate: task.dueDate ? task.dueDate.toISOString() : null,
            isPriority: task.isPriority || false
        };

        console.log('Adding task:', payload);
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/', payload);
            console.log('Task added:', res.data);
            setTasks(tasks => [...tasks, res.data]);
        } catch (err) {
            console.error("Error adding task:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        console.log('Deleting task:', id);
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/${id}/archive`);
            console.log('Task deleted:', id);
            setTasks(tasks => tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleTaskPriority = async (id) => {
        console.log('Toggling priority for task:', id);
        setLoading(true);
        setError(null);
        try {
            const res = await api.patch(`/${id}/toggle-priority`);
            console.log('Priority toggled:', res.data);
            setTasks(tasks => tasks.map(task =>
                task.id === id ? res.data : task
            ));
        } catch (err) {
            console.error("Error toggling task priority:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            error,
            fetchTasks,
            addTask,
            deleteTask,
            toggleTaskPriority
        }}>
            {children}
        </TaskContext.Provider>
    );
};