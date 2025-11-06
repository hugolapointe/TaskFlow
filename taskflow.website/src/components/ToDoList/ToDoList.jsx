import { useEffect, useState } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { useToDoFilters } from '../../hooks/useToDoFilters';
import ToDoItem from '../ToDoItem';
import StatsGrid from './components/StatsGrid';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import styles from './ToDoList.module.css';

const ToDoList = () => {
  const { todos, stats, loading, refresh } = useToDos();
  const filterState = useToDoFilters();
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    refresh(filterState.filters);
  }, [filterState.filters, refresh]);

  const handleEditStart = todoId => {
    setEditingTodoId(todoId);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Tasks</h2>
        <StatsGrid
          stats={stats}
          currentFilters={filterState.filters}
          activeStatType={filterState.getActiveStatType}
          onFilterChange={filterState.replaceFilters}
          onResetFilters={filterState.resetToDefault}
        />
      </div>

      <FilterBar filterState={filterState} />

      {loading ? (
        <LoadingSpinner />
      ) : todos.length === 0 ? (
        <EmptyState
          title="No tasks found"
          subtitle="Time to create your first one!"
        />
      ) : (
        <div className={styles.todosList}>
          {todos.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              isEditing={editingTodoId === todo.id}
              onEditStart={() => handleEditStart(todo.id)}
              onEditCancel={handleEditCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToDoList;
