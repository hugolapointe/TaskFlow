import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as todoApi from '../services/ToDoApi';
import { updateTodoInList, removeTodoFromList } from '../utils/todoHelpers';
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
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, priority: 0, nonPriority: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  
  const filterState = useToDoFilters();

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [filterState.filters]);

  const fetchStats = async () => {
    try {
      const data = await todoApi.getStats();
      setStats(data);
    } catch (error) {
      // Silent fail
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todoApi.getTodos(filterState.filters);
      setTodos(data?.items || []);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoApi.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      await fetchStats();
      toast.success("Task created!");
      return newTodo;
    } catch (error) {
      toast.error("Failed to create task");
      throw error;
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      let updatedTodo;

      if (updates.description !== undefined) {
        updatedTodo = await todoApi.updateTodoDescription(id, updates.description);
      }

 if (updates.dueDate !== undefined) {
   updatedTodo = await todoApi.updateTodoDueDate(id, updates.dueDate);
      }

      setTodos(prev => updateTodoInList(prev, id, updatedTodo));
      toast.success('Task updated!');
      return updatedTodo;
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  const changePriority = async (id, silent = false) => {
    try {
      const updatedTodo = await todoApi.toggleTodoPriority(id);
      setTodos(prev => updateTodoInList(prev, id, updatedTodo));
      await fetchStats();
      if (!silent) {
      toast.success('Priority updated!');
      }
    } catch (error) {
    toast.error('Failed to update priority');
  }
  };

  const markAsComplete = async (id) => {
    try {
      const updatedTodo = await todoApi.toggleTodoComplete(id);
      setTodos(prev => updateTodoInList(prev, id, updatedTodo));
      await fetchStats();
      toast.success(updatedTodo.isCompleted ? 'Task completed!' : 'Task reopened!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const archiveTodo = async (id) => {
    try {
      await todoApi.archiveTodo(id);
      setTodos(prev => removeTodoFromList(prev, id));
    if (selectedTodo?.id === id) {
        setSelectedTodo(null);
      }
await fetchStats();
      toast.success('Task archived!');
    } catch (error) {
      toast.error('Failed to archive task');
    }
  };

  const selectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const clearSelection = () => {
    setSelectedTodo(null);
  };

  const value = {
    todos,
    stats,
    loading,
    selectedTodo,
    filterState,
    createTodo,
    updateTodo,
    changePriority,
    markAsComplete,
    archiveTodo,
    selectTodo,
    clearSelection,
    refreshTodos: fetchTodos,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
