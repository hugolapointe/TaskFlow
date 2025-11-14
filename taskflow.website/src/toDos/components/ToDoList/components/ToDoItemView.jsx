import { cn } from '../../../../utils/cn';
import { formatDate, isOverdue } from '../../../../utils/date';
import Flex from '../../../../common/layout/Flex';
import Stack from '../../../../common/layout/Stack';
import PriorityToggle from '../../../common/PriorityToggle';
import EditButton from '../../../common/EditButton';
import CompleteButton from '../../../common/CompleteButton';

const ToDoItemView = ({ todo, onEdit, onComplete, onTogglePriority, disabled }) => {
    const textClasses = cn(
   'text-slate-100',
        todo.isCompleted && 'line-through text-slate-500'
    );

    const isTaskOverdue = isOverdue(todo.dueDate) && !todo.isCompleted;

    return (
    <Flex responsive align="center" gap="2 sm:gap-3">
            <Flex grow gap="3">
                <PriorityToggle
           isPriority={todo.isPriority}
     onToggle={onTogglePriority}
        disabled={disabled || todo.isCompleted}
      />

          <div className="flex-1 min-w-0">
          <p className={cn('text-sm sm:text-base font-medium', textClasses)}>
                        {todo.description}
                    </p>
      </div>
       </Flex>

            <Flex justify="between" className="sm:justify-end" gap="2 sm:gap-3">
                <div className="flex-1 sm:w-44 sm:flex sm:justify-end">
 {todo.dueDate && (
   <p className={cn('text-xs sm:text-sm', isTaskOverdue ? 'text-red-400 font-medium' : 'text-slate-400')}>
        {formatDate(todo.dueDate)}
     </p>
         )}
     </div>

     <Stack spacing="2">
      <EditButton onClick={onEdit} />
        {!todo.isCompleted && (
 <CompleteButton onClick={onComplete} />
 )}
     </Stack>
            </Flex>
        </Flex>
    );
};

export default ToDoItemView;
