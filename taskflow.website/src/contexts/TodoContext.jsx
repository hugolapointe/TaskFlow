import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as todoApi from '../services/ToDoApi';

const TodoContext = createContext();

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, priority: 0, nonPriority: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'CreatedAt',
    isPriority: undefined,
    isCompleted: undefined,
  });

  useEffect(() => {
    loadTodos();
    loadStats();
  }, [filters]);

  const loadStats = async () => {
    try {
      const data = await todoApi.getStats();
      setStats(data);
    } catch (error) {
      // Silent fail
    }
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await todoApi.getTodos(filters);
      if (data && data.items) {
        setTodos(data.items);
      } else {
        setTodos([]);
      }
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoApi.createTodo(todoData);
      setTodos((prev) => [newTodo, ...prev]);
      await loadStats();
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

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success('Task updated!');
      return updatedTodo;
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  const togglePriority = async (id, silent = false) => {
    try {
      const updatedTodo = await todoApi.toggleTodoPriority(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      await loadStats();
      if (!silent) {
        toast.success('Priority updated!');
      }
    } catch (error) {
      toast.error('Failed to update priority');
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodo = await todoApi.toggleTodoComplete(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      await loadStats();
      toast.success(updatedTodo.isCompleted ? 'Task completed!' : 'Task reopened!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const archiveTodo = async (id) => {
    try {
      await todoApi.archiveTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      if (selectedTodo?.id === id) {
        setSelectedTodo(null);
      }
      await loadStats();
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

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const value = {
    todos,
    stats,
    loading,
    selectedTodo,
    filters,
    createTodo,
    updateTodo,
    togglePriority,
    toggleComplete,
    archiveTodo,
    selectTodo,
    clearSelection,
    updateFilters,
    loadTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
