import { useToDos } from './useToDos';

export const useToDoState = () => {
    const { setToDos, setStats } = useToDos();

    const updateTodo = (todoId, updatedTodo) => {
        setToDos(prev => prev.map(t => t.id === todoId ? updatedTodo : t));
    };

    const removeTodo = (todoId) => {
        setToDos(prev => prev.filter(t => t.id !== todoId));
    };

    const addTodo = (newTodo) => {
        setToDos(prev => [newTodo, ...prev]);
    };

    const updateStats = (delta) => {
        if (!delta || Object.keys(delta).length === 0) return;

        setStats(prev => {
            const updated = { ...prev };
            Object.keys(delta).forEach(key => {
                if (key in updated) {
                    updated[key] = updated[key] + delta[key];
                }
            });
            return updated;
        });
    };

    const setStatsComplete = (newStats) => {
        setStats(newStats);
    };

    return {
        updateTodo,
        removeTodo,
        addTodo,
        updateStats,
        setStatsComplete
    };
};
