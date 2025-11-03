import { useToDos } from '../../contexts/ToDoContext';
import { formatDate, isOverdue } from '../../utils/todoHelpers';

const ToDoItem = ({ todo }) => {
  const { selectTodo, selectedTodo, markAsComplete, archiveTodo } = useToDos();

  const handleEdit = () => {
    selectTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAction = () => {
    if (todo.isCompleted) {
      if (window.confirm('Archive this task permanently?')) {
        archiveTodo(todo.id);
      }
    } else {
      markAsComplete(todo.id);
    }
  };

  const isSelected = selectedTodo?.id === todo.id;
  const isTaskOverdue = isOverdue(todo.dueDate, todo.isCompleted);

  return (
    <div
      className={`relative rounded-lg p-4 transition-all cursor-pointer border-2 ${
        isSelected
          ? 'border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20'
          : todo.isCompleted
          ? 'bg-gray-800/50 border-gray-700 opacity-60'
          : todo.isPriority
          ? 'bg-amber-900/20 border-amber-700/50 shadow-md shadow-amber-900/20'
          : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-sm'
      }`}
      onClick={handleEdit}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0 flex items-center gap-3">
          {todo.isPriority && (
            <svg
              className={`w-4 h-4 flex-shrink-0 ${
                todo.isCompleted ? 'fill-gray-500' : 'fill-amber-500'
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}

          <p
            className={`text-base font-medium flex-1 ${
              todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-100'
            }`}
          >
            {todo.description}
          </p>

          {todo.dueDate && (
            <div className="flex items-center gap-1 text-xs flex-shrink-0">
              <svg
                className="w-3 h-3 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={
                  isTaskOverdue ? 'text-red-400 font-medium' : 'text-gray-400'
                }
              >
                {formatDate(todo.dueDate)}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAction();
          }}
          className={`flex-shrink-0 p-2 rounded-lg transition-all ${
            todo.isCompleted
              ? 'text-gray-500 hover:bg-gray-700 hover:text-red-400'
              : 'text-gray-400 hover:bg-green-900/30 hover:text-green-400'
          }`}
          title={todo.isCompleted ? 'Archive' : 'Complete'}
        >
          {todo.isCompleted ? (
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
