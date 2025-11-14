import { useToDos } from './useToDos';
import { useAsyncAction } from './useAsyncAction';
import { 
    updateToDo, 
    toggleToDoPriority, 
    markToDoAsCompleted, 
 archiveToDo 
} from '../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import {
    updateTodoInList,
    removeTodoFromList,
    calculatePriorityStatsDelta,
    calculateCompletionStatsDelta,
    calculateArchiveStatsDelta,
    applyStatsDelta
} from '../utils/todoHelpers';

/**
 * Hook pour gérer les actions CRUD sur les ToDo items
 * Version refactorisée avec logique extraite dans des helpers
 * 
 * @param {Object} todo - Le todo sur lequel effectuer les actions
 * @returns {Object} Les handlers et état de chargement
 */
export const useToDoActions = (todo) => {
    const { setToDos, setStats } = useToDos();
    const { executeAction, isLoading } = useAsyncAction();

    /**
     * Met à jour le todo dans l'état local
     */
  const updateLocalTodo = (updatedTodo) => {
        setToDos(prev => updateTodoInList(prev, todo.id, updatedTodo));
    };

    /**
     * Met à jour les stats avec un delta
     */
  const updateLocalStats = (statsDelta) => {
     if (!statsDelta) return;
        
   setStats(prev => applyStatsDelta(prev, statsDelta));
    };

    /**
     * Met à jour un ToDo avec de nouvelles valeurs
     */
    const handleUpdate = async (updates) => {
return executeAction(
            async () => {
            const updatedToDo = await updateToDo(todo.id, updates);
       
                updateLocalTodo(updatedToDo);
                
   const statsDelta = calculatePriorityStatsDelta(
  todo.isPriority, 
         updatedToDo.isPriority
                );
       updateLocalStats(statsDelta);
         
         return updatedToDo;
      },
      SUCCESS_MESSAGES.UPDATE,
       ERROR_MESSAGES.UPDATE
        );
    };

    /**
     * Bascule la priorité d'un ToDo
     */
    const handleTogglePriority = async () => {
    return executeAction(
            async () => {
           const updatedToDo = await toggleToDoPriority(todo.id);
                
          updateLocalTodo(updatedToDo);
      
const statsDelta = calculatePriorityStatsDelta(
       todo.isPriority,
  updatedToDo.isPriority
   );
  updateLocalStats(statsDelta);
       
     return updatedToDo;
            },
   SUCCESS_MESSAGES.TOGGLE_PRIORITY,
  ERROR_MESSAGES.TOGGLE_PRIORITY,
            { showLoading: false }
        );
    };

    /**
  * Marque un ToDo comme complété
     */
    const handleComplete = async () => {
        return executeAction(
     async () => {
        const updatedToDo = await markToDoAsCompleted(todo.id);
        
    updateLocalTodo(updatedToDo);
    
    const statsDelta = calculateCompletionStatsDelta();
      updateLocalStats(statsDelta);
                
     return updatedToDo;
 },
            SUCCESS_MESSAGES.COMPLETE,
      ERROR_MESSAGES.COMPLETE,
    { showLoading: false }
        );
    };

    /**
     * Archive (supprime) un ToDo
     */
    const handleArchive = async (shouldConfirm = true) => {
        if (shouldConfirm && !window.confirm('Are you sure you want to archive this task?')) {
            return { success: false, cancelled: true };
        }

 return executeAction(
   async () => {
       await archiveToDo(todo.id);
          
                setToDos(prev => removeTodoFromList(prev, todo.id));
      
  const statsDelta = calculateArchiveStatsDelta(todo);
          updateLocalStats(statsDelta);
  },
            SUCCESS_MESSAGES.ARCHIVE,
            ERROR_MESSAGES.ARCHIVE,
            { showLoading: false }
    );
    };

    return {
        handleUpdate,
        handleTogglePriority,
        handleComplete,
    handleArchive,
        isLoading
    };
};
