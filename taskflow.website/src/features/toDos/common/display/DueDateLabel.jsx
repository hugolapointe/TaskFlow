import { cn } from '../../../../utils/cn';
import { formatDate, isOverdue } from '../../../../utils/date';


const DueDateLabel = ({ dueDate, isCompleted = false }) => {
    if (!dueDate) return null;

    const isTaskOverdue = isOverdue(dueDate) && !isCompleted;

    return (
        <p className={cn(
            'text-xs sm:text-sm sm:w-44 sm:text-right',
            isTaskOverdue ? 'text-red-400 font-medium' : 'text-slate-400'
        )}>
            {formatDate(dueDate)}
        </p>
    );
};

export default DueDateLabel;
