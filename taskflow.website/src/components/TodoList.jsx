import { useTodos } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, filters, updateFilters } = useTodos();

  const handleFilterChange = (filterType, value) => {
    updateFilters({ [filterType]: value });
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.isCompleted).length,
    pending: todos.filter((t) => !t.isCompleted).length,
    priority: todos.filter((t) => t.isPriority && !t.isCompleted).length,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header with stats */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">My Tasks</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
  <div className="bg-gray-50 rounded p-2 text-center">
  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
<p className="text-xs text-gray-600">Total</p>
          </div>
          <div className="bg-blue-50 rounded p-2 text-center">
        <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
       <div className="bg-green-50 rounded p-2 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
      <p className="text-xs text-gray-600">Done</p>
          </div>
       <div className="bg-red-50 rounded p-2 text-center">
  <p className="text-2xl font-bold text-red-600">{stats.priority}</p>
            <p className="text-xs text-gray-600">Urgent</p>
      </div>
        </div>
      </div>

 {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 pb-4 border-b">
        {/* Status Filter */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
          Status
  </label>
          <select
            value={filters.isCompleted === undefined ? 'all' : filters.isCompleted}
       onChange={(e) => {
   const value = e.target.value === 'all' ? undefined : e.target.value === 'true';
   handleFilterChange('isCompleted', value);
    }}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
     <option value="all">All</option>
       <option value="false">Pending</option>
  <option value="true">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
      <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
   Priority
          </label>
  <select
  value={filters.isPriority === undefined ? 'all' : filters.isPriority}
          onChange={(e) => {
        const value = e.target.value === 'all' ? undefined : e.target.value === 'true';
    handleFilterChange('isPriority', value);
      }}
       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
<option value="all">All</option>
            <option value="true">High Priority</option>
        <option value="false">Normal</option>
  </select>
        </div>

 {/* Sort */}
        <div className="flex-1">
        <label className="block text-xs font-medium text-gray-700 mb-1">
        Sort by
        </label>
<select
 value={filters.sortBy}
onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
     <option value="CreatedAt">Created Date</option>
       <option value="DueDate">Due Date</option>
   </select>
        </div>
      </div>

  {/* Todo list */}
      {loading ? (
        <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-8">
   <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-600 mt-2">No tasks found</p>
          <p className="text-sm text-gray-500">Time to create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
   {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} />
   ))}
        </div>
      )}
 </div>
  );
};

export default TodoList;
