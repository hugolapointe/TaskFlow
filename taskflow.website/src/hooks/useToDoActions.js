import { useAsyncAction } from '@hooks/useAsyncAction';
import { useToDoState } from '@hooks/useToDoState';
import { updateToDo, toggleToDoPriority, markToDoAsCompleted, archiveToDo } from '@api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@utils/constants';

export const useToDoActions = (todo) => {
    const { execute, isLoading } = useAsyncAction();
    const { updateTodo, removeTodo, updateStats } = useToDoState();

    const handleUpdate = async (updates) => {
  return execute(
       async () => {
     const updatedToDo = await updateToDo(todo.id, updates);

     updateTodo(todo.id, updatedToDo);

   if (todo.isPriority !== updatedToDo.isPriority) {
        const delta = updatedToDo.isPriority ? 1 : -1;
     updateStats({
         priority: delta,
     nonPriority: -delta
   });
       }

  return updatedToDo;
 },
  {
       successMessage: SUCCESS_MESSAGES.UPDATE,
    errorMessage: ERROR_MESSAGES.UPDATE
     }
);
    };

    const handleTogglePriority = async () => {
return execute(
async () => {
const updatedToDo = await toggleToDoPriority(todo.id);

  updateTodo(todo.id, updatedToDo);

       const delta = updatedToDo.isPriority ? 1 : -1;
      updateStats({
   priority: delta,
       nonPriority: -delta
});

   return updatedToDo;
 },
      {
 successMessage: SUCCESS_MESSAGES.TOGGLE_PRIORITY,
  errorMessage: ERROR_MESSAGES.TOGGLE_PRIORITY,
     showLoading: false
     }
 );
    };

  const handleComplete = async () => {
 return execute(
       async () => {
const updatedToDo = await markToDoAsCompleted(todo.id);

 updateTodo(todo.id, updatedToDo);

  updateStats({ completed: 1 });

     return updatedToDo;
    },
{
       successMessage: SUCCESS_MESSAGES.COMPLETE,
   errorMessage: ERROR_MESSAGES.COMPLETE,
  showLoading: false
       }
  );
    };

    const handleArchive = async (shouldConfirm = true) => {
  if (shouldConfirm && !window.confirm('Are you sure you want to archive this task?')) {
 return { success: false, cancelled: true };
 }

        return execute(
 async () => {
    await archiveToDo(todo.id);

removeTodo(todo.id);

   updateStats({
   total: -1,
       priority: todo.isPriority ? -1 : 0,
  nonPriority: !todo.isPriority ? -1 : 0,
       completed: todo.isCompleted ? -1 : 0
      });
     },
 {
      successMessage: SUCCESS_MESSAGES.ARCHIVE,
     errorMessage: ERROR_MESSAGES.ARCHIVE,
        showLoading: false
 }
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
