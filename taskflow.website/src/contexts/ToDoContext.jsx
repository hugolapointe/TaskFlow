import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import * as toDoApi from '../services/ToDoApi';
import { updateToDoInList, removeToDoFromList } from '../utils/toDoUtils';
import { useToDoFilters } from '../hooks/useToDoFilters';

const ToDoContext = createContext();

export const useToDos = () => {
    const context = useContext(ToDoContext);
  if (!context) {
        throw new Error('useToDos must be used within a ToDoProvider');
    }
    return context;
};

export const ToDoProvider = ({ children }) => {
    const [toDos, setToDos] = useState([]);
    const [stats, setStats] = useState({ total: 0, priority: 0, nonPriority: 0, completed: 0 });
    const [loading, setLoading] = useState(false);
    const [selectedToDoId, setSelectedToDoId] = useState(null);

    const filterState = useToDoFilters();

    const selectedToDo = useMemo(() => {
        if (!selectedToDoId) return null;
        return toDos.find(toDo => toDo.id === selectedToDoId) || null;
    }, [toDos, selectedToDoId]);

    const fetchStats = useCallback(async () => {
        try {
   const data = await toDoApi.getStats();
      setStats(data);
        } catch (error) {
            // Silent fail
        }
    }, []);

    const fetchToDos = useCallback(async () => {
    setLoading(true);
        try {
            const data = await toDoApi.getToDos(filterState.filters);
      setToDos(data?.items || []);
     } catch (error) {
  toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, [filterState.filters]);

    useEffect(() => {
        fetchToDos();
        fetchStats();
    }, [fetchToDos, fetchStats]);

  const createToDo = useCallback(async (toDoData) => {
        try {
       const newToDo = await toDoApi.createToDo(toDoData);
   setToDos(prev => [newToDo, ...prev]);
      await fetchStats();
    toast.success("Task created!");
            return newToDo;
  } catch (error) {
toast.error("Failed to create task");
            throw error;
        }
    }, [fetchStats]);

    const updateToDo = useCallback(async (id, updates) => {
    try {
            const currentToDo = toDos.find(t => t.id === id);
   if (!currentToDo) {
          throw new Error('ToDo not found');
          }

         const updatedToDo = await toDoApi.updateToDo(id, {
    description: updates.description ?? currentToDo.description,
     dueDate: updates.dueDate ?? currentToDo.dueDate,
    isPriority: updates.isPriority ?? currentToDo.isPriority
   });

 setToDos(prev => updateToDoInList(prev, id, updatedToDo));
       await fetchStats();
            toast.success('Task updated!');
            return updatedToDo;
        } catch (error) {
 toast.error('Failed to update task');
    throw error;
   }
    }, [toDos, fetchStats]);

const changePriority = useCallback(async (id, silent = false) => {
        try {
      const updatedToDo = await toDoApi.toggleToDoPriority(id);
            setToDos(prev => updateToDoInList(prev, id, updatedToDo));
            await fetchStats();
  if (!silent) {
              toast.success('Priority updated!');
            }
        } catch (error) {
toast.error('Failed to update priority');
        }
    }, [fetchStats]);

    const markAsComplete = useCallback(async (id) => {
        try {
            const updatedToDo = await toDoApi.markToDoAsCompleted(id);
    setToDos(prev => updateToDoInList(prev, id, updatedToDo));
          await fetchStats();
            toast.success(updatedToDo.isCompleted ? 'Task completed!' : 'Task reopened!');
        } catch (error) {
            toast.error('Failed to update status');
      }
    }, [fetchStats]);

  const archiveToDo = useCallback(async (id) => {
   try {
            await toDoApi.archiveToDo(id);
       setToDos(prev => removeToDoFromList(prev, id));

            if (selectedToDoId === id) {
       setSelectedToDoId(null);
          }

            await fetchStats();
      toast.success('Task archived!');
        } catch (error) {
            toast.error('Failed to archive task');
        }
    }, [selectedToDoId, fetchStats]);

    const selectToDo = useCallback((toDo) => {
        setSelectedToDoId(toDo.id);
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedToDoId(null);
    }, []);

    const value = useMemo(() => ({
        toDos,
        stats,
      loading,
        selectedToDo,
        filterState,
        createToDo,
        updateToDo,
        changePriority,
        markAsComplete,
        archiveToDo,
        selectToDo,
clearSelection,
        refreshToDos: fetchToDos,
    }), [
  toDos,
        stats,
     loading,
        selectedToDo,
        filterState,
        createToDo,
        updateToDo,
        changePriority,
        markAsComplete,
        archiveToDo,
        selectToDo,
  clearSelection,
        fetchToDos
    ]);

    return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
