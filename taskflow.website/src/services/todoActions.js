import { toast } from 'react-toastify';
import * as toDoApi from './ToDoApi';
import { updateInList, removeFromList } from '../utils/toDoUtils';

const withStatsUpdate = async (action, successMsg, errorMsg, updateStats) => {
    try {
        const result = await action();
        await updateStats();
        if (successMsg) {
            toast.success(successMsg);
        }
        return result;
    } catch (error) {
      toast.error(errorMsg);
        throw error;
    }
};

export const createTodo = async (data, setTodos, updateStats) => {
    return withStatsUpdate(
        async () => {
  const todo = await toDoApi.createToDo(data);
    setTodos(prev => [todo, ...prev]);
            return todo;
        },
"Task created!",
        "Failed to create task",
        updateStats
    );
};

export const updateTodo = async (id, updates, todos, setTodos, updateStats) => {
    return withStatsUpdate(
        async () => {
const existing = todos.find(t => t.id === id);
         if (!existing) {
              throw new Error('Todo not found');
            }

   const updated = await toDoApi.updateToDo(id, {
         description: updates.description ?? existing.description,
                dueDate: updates.dueDate ?? existing.dueDate,
        isPriority: updates.isPriority ?? existing.isPriority,
      isCompleted: updates.isCompleted ?? existing.isCompleted  // ? Préserver isCompleted
            });

       setTodos(prev => updateInList(prev, id, updated));
  return updated;
        },
        'Task updated!',
'Failed to update task',
        updateStats
    );
};

export const togglePriority = async (id, setTodos, updateStats) => {
    return withStatsUpdate(
        async () => {
            const updated = await toDoApi.toggleToDoPriority(id);
        setTodos(prev => updateInList(prev, id, updated));
return updated;
      },
        'Priority updated!',
        'Failed to update priority',
      updateStats
    );
};

export const toggleComplete = async (id, setTodos, updateStats) => {
 const updated = await withStatsUpdate(
     async () => {
   const todo = await toDoApi.markToDoAsCompleted(id);
        setTodos(prev => updateInList(prev, id, todo));
   return todo;
        },
        null,
   'Failed to update status',
    updateStats
    );

  toast.success(updated.isCompleted ? 'Task completed!' : 'Task reopened!');
    return updated;
};

export const archive = async (id, setTodos, updateStats) => {
    return withStatsUpdate(
 async () => {
      await toDoApi.archiveToDo(id);
 setTodos(prev => removeFromList(prev, id));
        },
        'Task archived!',
        'Failed to archive task',
 updateStats
    );
};
