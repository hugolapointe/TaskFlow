import { useToDos } from '../../contexts/ToDoContext';
import { formatDate, isOverdue } from '../../utils/todoUtils';
import { StarIcon, CalendarIcon, CheckCircleIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

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
            <StarIconSolid
              className={`w-4 h-4 flex-shrink-0 ${
                todo.isCompleted ? 'fill-gray-500' : 'fill-amber-500'
              }`}
            />
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
              <CalendarIcon className="w-3 h-3 text-gray-500" />
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
            <ArchiveBoxIcon className="w-5 h-5" />
          ) : (
            <CheckCircleIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
