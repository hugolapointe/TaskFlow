import { createContext, useState, useEffect } from 'react';
import { getToDos, getToDoStats } from '../api/toDosApi';
import { ERROR_MESSAGES } from '../utils/constants';
import toast from 'react-hot-toast';

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
    const [toDos, setToDos] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        priority: 0,
        nonPriority: 0,
        completed: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadToDos();
        loadStats();
    }, []);

    const loadToDos = async () => {
        try {
            setLoading(true);
            const data = await getToDos();
            setToDos(Array.isArray(data) ? data : []);

        } catch (error) {
            toast.error(ERROR_MESSAGES.LOAD);
            setToDos([]);

        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const data = await getToDoStats();
            setStats(data);

        } catch (error) {
            console.error('Could not load statistics:', error);
        }
    };

    const value = {
        toDos,
        setToDos,
        stats,
        setStats,
        loading,
    };

    return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
