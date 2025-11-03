import { useToDos } from '../../contexts/ToDoContext';
import ToDoItem from '../ToDoItem';
import StatsGrid from './components/StatsGrid';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import styles from './ToDoList.module.css';

const ToDoList = () => {
    const { todos, stats, loading, filterState } = useToDos();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>My Tasks</h2>
                <StatsGrid
                    stats={stats}
                    currentFilters={filterState.filters}
                    activeStatType={filterState.getActiveStatType}
                    onFilterChange={filterState.replaceFilters}
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
                        <ToDoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ToDoList;
