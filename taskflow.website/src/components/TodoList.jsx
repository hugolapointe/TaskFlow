import { useTodos } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, stats, loading, filters, updateFilters } = useTodos();

  const handleFilterChange = (filterType, value) => {
    updateFilters({ [filterType]: value });
  };

  const handleStatClick = (statType) => {
    switch (statType) {
      case 'total':
        updateFilters({ isCompleted: undefined, isPriority: undefined });
        break;
      case 'priority':
        updateFilters({ isCompleted: false, isPriority: true });
        break;
      case 'nonpriority':
        updateFilters({ isCompleted: false, isPriority: false });
        break;
      case 'completed':
        updateFilters({ isCompleted: true, isPriority: undefined });
        break;
    }
  };

  const isStatActive = (statType) => {
    switch (statType) {
      case 'total':
        return filters.isCompleted === undefined && filters.isPriority === undefined;
      case 'priority':
        return filters.isCompleted === false && filters.isPriority === true;
      case 'nonpriority':
        return filters.isCompleted === false && filters.isPriority === false;
      case 'completed':
        return filters.isCompleted === true;
      default:
        return false;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-3">My Tasks</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <button
     onClick={() => handleStatClick('total')}
            className={`rounded p-2 text-center transition-all ${
              isStatActive('total')
     ? 'bg-gray-600 border-2 border-gray-400 shadow-lg'
     : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
    }`}
          >
            <p className="text-2xl font-bold text-gray-100">{stats.total}</p>
       <p className="text-xs text-gray-400">Total</p>
          </button>

          <button
         onClick={() => handleStatClick('priority')}
            className={`rounded p-2 text-center transition-all ${
          isStatActive('priority')
? 'bg-amber-800 border-2 border-amber-600 shadow-lg'
  : 'bg-amber-900/50 border border-amber-800 hover:bg-amber-800/70 cursor-pointer'
 }`}
          >
 <p className="text-2xl font-bold text-amber-400">{stats.priority}</p>
            <p className="text-xs text-gray-400">Priority</p>
          </button>

       <button
       onClick={() => handleStatClick('nonpriority')}
   className={`rounded p-2 text-center transition-all ${
    isStatActive('nonpriority')
                ? 'bg-blue-800 border-2 border-blue-600 shadow-lg'
         : 'bg-blue-900/50 border border-blue-800 hover:bg-blue-800/70 cursor-pointer'
     }`}
          >
            <p className="text-2xl font-bold text-blue-400">{stats.nonPriority}</p>
         <p className="text-xs text-gray-400">Non Priority</p>
          </button>

          <button
         onClick={() => handleStatClick('completed')}
      className={`rounded p-2 text-center transition-all ${
              isStatActive('completed')
            ? 'bg-green-800 border-2 border-green-600 shadow-lg'
       : 'bg-green-900/50 border border-green-800 hover:bg-green-800/70 cursor-pointer'
     }`}
      >
         <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
  <p className="text-xs text-gray-400">Completed</p>
          </button>
      </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4 pb-4 border-b border-gray-700">
      <div className="flex-1">
   <label className="block text-xs font-medium text-gray-400 mb-1">
            Status
   </label>
          <select
   value={filters.isCompleted === undefined ? 'all' : filters.isCompleted}
      onChange={(e) => {
              const value = e.target.value === 'all' ? undefined : e.target.value === 'true';
     handleFilterChange('isCompleted', value);
  }}
         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
    <option value="all">All</option>
     <option value="false">Pending</option>
     <option value="true">Completed</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-400 mb-1">
  Priority
        </label>
          <select
            value={
              filters.isPriority === undefined 
      ? 'all' 
    : filters.isPriority === true 
    ? 'priority' 
        : 'nonpriority'
        }
  onChange={(e) => {
        const value = 
        e.target.value === 'all' 
        ? undefined 
                  : e.target.value === 'priority' 
        ? true 
      : false;
     handleFilterChange('isPriority', value);
         }}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
>
            <option value="all">All</option>
  <option value="priority">Priority Only</option>
        <option value="nonpriority">Non Priority Only</option>
  </select>
        </div>

     <div className="flex-1">
 <label className="block text-xs font-medium text-gray-400 mb-1">
 Sort by
      </label>
          <select
       value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="CreatedAt">Created Date</option>
            <option value="DueDate">Due Date</option>
      </select>
        </div>
      </div>

      {loading ? (
    <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
     <p className="text-gray-400 mt-2">Loading...</p>
   </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-8">
   <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
       <p className="text-gray-400 mt-2">No tasks found</p>
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
