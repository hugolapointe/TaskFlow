import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import * as toDoApi from '../services/ToDoApi';
import * as toDoActions from '../services/toDoActions';

const ToDoContext = createContext();

export const useToDos = () => {
    const context = useContext(ToDoContext);

    if (!context) {
        throw new Error('useToDos must be used within a ToDoProvider');
    }

    return context;
};

export const ToDoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [stats, setStats] = useState({ total: 0, priority: 0, nonPriority: 0, completed: 0 });
    const [loading, setLoading] = useState(false);

    const updateStats = useCallback(async () => {
        try {
            const data = await toDoApi.getStats();
            setStats(data);

        } catch (error) {
            // Silent fail
        }
    }, []);

    const fetchTodos = useCallback(async (filters = {}) => {
        setLoading(true);
        try {
            const data = await toDoApi.getToDos(filters);
            setTodos(data?.items || []);

        } catch (error) {
            toast.error('Failed to load tasks');

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
        updateStats();
    }, [fetchTodos, updateStats]);

    const actions = useMemo(() => ({
        create: (data) => toDoActions.createTodo(data, setTodos, updateStats),
        update: (id, updates) => toDoActions.updateTodo(id, updates, todos, setTodos, updateStats),
        togglePriority: (id) => toDoActions.togglePriority(id, setTodos, updateStats),
        toggleComplete: (id) => toDoActions.toggleComplete(id, setTodos, updateStats),
        archive: (id) => toDoActions.archive(id, setTodos, updateStats)
    }), [updateStats, todos]);

    const value = useMemo(() => ({
        todos, 
        stats,
        loading,
        actions,
        refresh: fetchTodos
    }), [todos, stats, loading, actions, fetchTodos]);

    return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
