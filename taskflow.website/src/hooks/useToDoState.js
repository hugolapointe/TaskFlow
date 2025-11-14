import { useToDos } from '@hooks/useToDos';
import { updateItemInList, removeItemFromList, prependItemToList } from '@utils/listHelpers';

export const useToDoState = () => {
    const { setToDos, setStats } = useToDos();

    const updateTodo = (todoId, updatedTodo) => {
        setToDos(prev => updateItemInList(prev, todoId, updatedTodo));
    };

    const removeTodo = (todoId) => {
        setToDos(prev => removeItemFromList(prev, todoId));
    };

    const addTodo = (newTodo) => {
        setToDos(prev => prependItemToList(prev, newTodo));
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
