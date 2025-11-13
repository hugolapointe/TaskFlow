import { CheckIcon, PencilIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../../utils/cn';
import { formatDateForDisplay, isOverdue } from '../../../../utils/date';
import IconButton from '../../../../common/IconButton';
import PriorityToggle from '../../../../common/PriorityToggle';

const ToDoItemView = ({ todo, onEdit, onComplete, onTogglePriority, disabled }) => {
  const textClasses = cn(
    'text-slate-100',
    todo.isCompleted && 'line-through text-slate-500'
  );

  const isTaskOverdue = isOverdue(todo.dueDate) && !todo.isCompleted;

  return (
    <div className="flex items-center gap-3">
      <PriorityToggle
    isPriority={todo.isPriority}
        onToggle={onTogglePriority}
        disabled={disabled || todo.isCompleted}
      />

      <div className="flex-1 min-w-0">
  <p className={cn('text-base font-medium', textClasses)}>
     {todo.description}
        </p>
  </div>

      <div className="w-44 flex justify-end items-center">
        {todo.dueDate && (
   <p className={cn('text-sm text-right', isTaskOverdue ? 'text-red-400 font-medium' : 'text-slate-400')}>
         {formatDateForDisplay(todo.dueDate)}
       </p>
   )}
      </div>

<div className="flex items-center gap-2">
   <IconButton
    icon={<PencilIcon className="w-5 h-5" />}
  label="Edit"
     variant="primary"
        onClick={onEdit}
        />
  {!todo.isCompleted && (
          <IconButton
   icon={<CheckIcon className="w-5 h-5" />}
   label="Mark as completed"
variant="success"
      onClick={onComplete}
  />
        )}
      </div>
    </div>
  );
};

export default ToDoItemView;
