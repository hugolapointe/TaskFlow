import { useTodos } from '../contexts/TodoContext';

const TodoItem = ({ todo }) => {
  const { selectTodo, toggleComplete, togglePriority, deleteTodo } = useTodos();

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // Format YYYY-MM-DD
  };

  const isOverdue = (dateString) => {
    if (!dateString || todo.isCompleted) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const handleEdit = () => {
    selectTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 p-4 transition-all hover:shadow-md ${
        todo.isPriority ? 'border-red-500' : 'border-gray-300'
      } ${todo.isCompleted ? 'opacity-60' : ''}`}
>
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox + Description */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
   <button
   onClick={() => toggleComplete(todo.id)}
         className="mt-1 flex-shrink-0"
 aria-label={todo.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
 <div
   className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
         todo.isCompleted
      ? 'bg-green-500 border-green-500'
      : 'border-gray-300 hover:border-green-500'
        }`}
      >
          {todo.isCompleted && (
          <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M5 13l4 4L19 7"></path>
 </svg>
           )}
   </div>
       </button>

       <div className="flex-1 min-w-0">
     <p
              className={`text-gray-800 break-words ${
    todo.isCompleted ? 'line-through text-gray-500' : ''
           }`}
      >
              {todo.description}
     </p>

       {/* Date and badges */}
  <div className="flex flex-wrap items-center gap-2 mt-2">
     {todo.dueDate && (
            <span
             className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
          isOverdue(todo.dueDate)
      ? 'bg-red-100 text-red-700'
      : 'bg-blue-100 text-blue-700'
     }`}
         >
       <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
   </svg>
 {formatDate(todo.dueDate)}
        </span>
      )}

              {todo.isPriority && (
      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
  <svg className="w-3 h-3 fill-red-500" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
                  Priority
     </span>
   )}
            </div>
   </div>
    </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0">
          <button
          onClick={() => togglePriority(todo.id)}
            className={`p-2 rounded hover:bg-gray-100 transition-all ${
      todo.isPriority ? 'text-red-500' : 'text-gray-400'
         }`}
         aria-label="Toggle priority"
       title="Toggle priority"
          >
  <svg className={`w-5 h-5 transition-all ${todo.isPriority ? 'fill-red-500 scale-110' : 'fill-gray-400'}`} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
   </svg>
          </button>

       <button
  onClick={handleEdit}
         className="p-2 rounded hover:bg-gray-100 text-blue-600 transition-colors"
         aria-label="Edit"
     title="Edit"
  >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
       </button>

 <button
            onClick={() => {
         if (window.confirm('Delete this task? No going back!')) {
        deleteTodo(todo.id);
  }
            }}
 className="p-2 rounded hover:bg-gray-100 text-red-600 transition-colors"
  aria-label="Delete"
        title="Delete"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
   </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
