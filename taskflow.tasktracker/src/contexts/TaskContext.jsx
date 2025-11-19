import { createContext, useState, useEffect, useMemo } from 'react';
import { taskAPI } from '@/api/taskAPI';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const stats = useMemo(() => ({
        total: tasks.length,
        priority: tasks.filter(task => task.isPriority).length,
        completed: tasks.filter(task => task.isCompleted).length
    }), [tasks]);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskAPI.getAll();
            setTasks(data);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    const addTask = async (task) => {
        setError(null);
        try {
            const toAdd = {
                description: task.description,
                dueDate: task.dueDate?.toISOString() || null,
                isPriority: task.isPriority || false
            };
            const added = await taskAPI.create(toAdd);
            setTasks(prevTasks => [added, ...prevTasks]);

        } catch (err) {
            setError(err.message);
        }
    };

    const deleteTask = async (id) => {
        setError(null);
        try {
            await taskAPI.archive(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

        } catch (err) {
            setError(err.message);

        }
    };

    const toggleTaskPriority = async (id) => {
        setError(null);
        try {
            const updatedTask = await taskAPI.togglePriority(id);
            setTasks(prevTasks =>
                prevTasks.map(task => task.id === id ? updatedTask : task)
            );

        } catch (err) {
            setError(err.message);

        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            stats,
            loading,
            error,
            addTask,
            deleteTask,
            toggleTaskPriority
        }}>
            {children}
        </TaskContext.Provider>
    );
};