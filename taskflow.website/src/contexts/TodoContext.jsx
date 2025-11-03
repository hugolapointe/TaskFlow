import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as todoApi from '../services/todoApi';

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
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'CreatedAt',
    isPriority: undefined,
    isCompleted: undefined,
  });

  // Load todos on mount and when filters change
  useEffect(() => {
    loadTodos();
  }, [filters]);

  const loadTodos = async () => {
    console.log('?? Loading todos with filters:', filters);
    setLoading(true);
    try {
      const data = await todoApi.getTodos(filters);
      console.log('?? Received data:', data);
      console.log('?? Items:', data.items);
      console.log('?? Total count:', data.totalCount);
      
      if (data && data.items) {
        setTodos(data.items);
        console.log('? Todos loaded successfully:', data.items.length, 'items');
      } else {
        console.warn('?? No items in response:', data);
        setTodos([]);
      }
    } catch (error) {
      console.error('? Error loadTodos:', error);
      console.error('? Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error('Oops! Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todoData) => {
    console.log('? Creating todo:', todoData);
    try {
      const newTodo = await todoApi.createTodo(todoData);
      console.log('? Todo created:', newTodo);
      setTodos((prev) => [newTodo, ...prev]);
      toast.success("Task created! Let's do this!");
      return newTodo;
    } catch (error) {
      console.error('? Error createTodo:', error);
      console.error('? Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error("Couldn't create task");
      throw error;
    }
  };

  const updateTodo = async (id, updates) => {
    console.log('?? Updating todo:', id, updates);
    try {
      let updatedTodo;
 
      if (updates.description !== undefined) {
        updatedTodo = await todoApi.updateTodoDescription(id, updates.description);
      }
    
      if (updates.dueDate !== undefined) {
        updatedTodo = await todoApi.updateTodoDueDate(id, updates.dueDate);
      }

      console.log('? Todo updated:', updatedTodo);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success('Task updated!');
      return updatedTodo;
    } catch (error) {
      console.error('? Error updateTodo:', error);
      toast.error('Update failed');
      throw error;
    }
  };

  const togglePriority = async (id) => {
    try {
      const updatedTodo = await todoApi.toggleTodoPriority(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success('Priority changed!');
    } catch (error) {
      console.error('? Error togglePriority:', error);
      toast.error('Priority toggle failed');
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodo = await todoApi.toggleTodoComplete(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      toast.success(updatedTodo.isCompleted ? 'Nice work!' : 'Back to work!');
    } catch (error) {
      console.error('? Error toggleComplete:', error);
      toast.error('Status toggle failed');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      if (selectedTodo?.id === id) {
        setSelectedTodo(null);
      }
      toast.success('Task deleted!');
    } catch (error) {
      console.error('? Error deleteTodo:', error);
      toast.error('Deletion failed');
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
    loading,
    selectedTodo,
    filters,
    createTodo,
    updateTodo,
    togglePriority,
    toggleComplete,
    deleteTodo,
    selectTodo,
    clearSelection,
    updateFilters,
    loadTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
