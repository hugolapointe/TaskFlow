import { createContext, useState, useEffect } from 'react';
import { getToDos, getToDoStats } from '../api/toDosApi';
import toast from 'react-hot-toast';


export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [toDos, setToDos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    priority: 0,
    nonPriority: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all', 'priority', 'non-priority'
  const [sortBy, setSortBy] = useState('created'); // 'created', 'dueDate'

  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);

 
  useEffect(() => {
    loadToDos();
    loadStats();
  }, []);


  const loadToDos = async () => {
    try {
      setLoading(true);
      const data = await getToDos();
      setToDos(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Could not load tasks');
      setToDos([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getToDoStats();
      setStats(data);
    } catch (error) {
      console.error('Could not load statistics:', error);
    }
  };

  const refreshData = async () => {
    await Promise.all([loadToDos(), loadStats()]);
  };

  const value = {
    toDos,
    setToDos,
    stats,
    setStats,
    loading,

    // Filters and sorting
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,

    // Selected and editing tasks
    selectedId,
    setSelectedId,
    editingId,
    setEditingId,

    // Actions
    loadToDos,
    loadStats,
    refreshData,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
};
