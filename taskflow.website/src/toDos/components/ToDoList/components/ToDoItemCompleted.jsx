import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../../utils/cn';
import { formatDateForDisplay, isOverdue } from '../../../../utils/date';
import IconButton from '../../../../common/IconButton';
import PriorityToggle from '../../../common/PriorityToggle';

const ToDoItemCompleted = ({ todo, onEdit, onArchive, onTogglePriority, disabled }) => {
  const textClasses = 'text-slate-100 line-through text-slate-500';
  const isTaskOverdue = isOverdue(todo.dueDate);

  return (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
   <PriorityToggle
  isPriority={todo.isPriority}
   onToggle={onTogglePriority}
 disabled={true}
    />

<div className="flex-1 min-w-0">
   <p className={cn('text-sm sm:text-base font-medium', textClasses)}>
    {todo.description}
   </p>
        </div>
      </div>

 <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
  <div className="flex-1 sm:w-44 sm:flex sm:justify-end">
          {todo.dueDate && (
  <p className={cn('text-xs sm:text-sm', isTaskOverdue ? 'text-red-400 font-medium' : 'text-slate-400')}>
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
        <IconButton
      icon={<TrashIcon className="w-5 h-5" />}
            label="Archive"
       variant="danger"
            onClick={onArchive}
     />
        </div>
 </div>
    </div>
  );
};

export default ToDoItemCompleted;
