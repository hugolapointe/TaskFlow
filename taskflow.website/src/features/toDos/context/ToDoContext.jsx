import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getToDos, createToDo, updateToDo, toggleToDoPriority, markToDoAsCompleted, archiveToDo } from '../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@utils/constants';
import { updateItemInList, removeItemFromList, prependItemToList } from '@utils/listHelpers';
import toast from 'react-hot-toast';

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
    const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(true);

    const stats = useMemo(() => ({
     total: toDos.length,
        priority: toDos.filter(t => t.isPriority && !t.isCompleted).length,
        nonPriority: toDos.filter(t => !t.isPriority && !t.isCompleted).length,
        completed: toDos.filter(t => t.isCompleted).length,
    }), [toDos]);

    useEffect(() => {
     const fetchToDos = async () => {
try {
                const data = await getToDos();
           setToDos(Array.isArray(data) ? data : (data.items || []));
            } catch (error) {
  toast.error(ERROR_MESSAGES.LOAD);
} finally {
             setLoading(false);
            }
        };
   fetchToDos();
    }, []);

    const addTodo = async (newTodo) => {
        try {
            const created = await createToDo(newTodo);
   setToDos(prev => prependItemToList(prev, created));
  toast.success(SUCCESS_MESSAGES.CREATE);
   return created;
     } catch (error) {
toast.error(ERROR_MESSAGES.CREATE);
         throw error;
}
    };

    const updateTodo = async (id, updates) => {
     try {
         const updated = await updateToDo(id, updates);
     setToDos(prev => updateItemInList(prev, id, updated));
        toast.success(SUCCESS_MESSAGES.UPDATE);
     return updated;
        } catch (error) {
            toast.error(ERROR_MESSAGES.UPDATE);
            throw error;
        }
    };

    const togglePriority = async (id) => {
      try {
            const updated = await toggleToDoPriority(id);
     setToDos(prev => updateItemInList(prev, id, updated));
            toast.success(SUCCESS_MESSAGES.TOGGLE_PRIORITY);
   return updated;
        } catch (error) {
   toast.error(ERROR_MESSAGES.TOGGLE_PRIORITY);
            throw error;
        }
    };

    const completeTodo = async (id) => {
    try {
          const updated = await markToDoAsCompleted(id);
          setToDos(prev => updateItemInList(prev, id, updated));
            toast.success(SUCCESS_MESSAGES.COMPLETE);
     return updated;
        } catch (error) {
            toast.error(ERROR_MESSAGES.COMPLETE);
        throw error;
        }
    };

    const deleteTodo = async (id, shouldConfirm = true) => {
        if (shouldConfirm && !window.confirm('Are you sure you want to archive this task?')) {
 return null;
   }

        try {
    await archiveToDo(id);
 setToDos(prev => removeItemFromList(prev, id));
            toast.success(SUCCESS_MESSAGES.ARCHIVE);
 } catch (error) {
    toast.error(ERROR_MESSAGES.ARCHIVE);
throw error;
        }
    };

    return (
        <ToDoContext.Provider value={{
 toDos,
       stats,
    loading,
            addTodo,
            updateTodo,
            togglePriority,
            completeTodo,
            deleteTodo
        }}>
   {children}
    </ToDoContext.Provider>
    );
};

export const useToDos = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error('useToDos must be used within a ToDoProvider');
    }
    return context;
};
