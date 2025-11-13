import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { formatDateForDisplay } from '../../../../utils/date';

const ToDoItemAudit = ({ createdAt, updatedAt }) => {
  return (
    <>
      <div className="border-t border-slate-700 mt-3 mb-3 -mx-4" />
    <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
  <CalendarIcon className="w-3 h-3" />
          <span className="font-bold">Created at:</span> {formatDateForDisplay(createdAt)}
   </span>
        {updatedAt && (
       <>
      <div className="h-4 w-px bg-slate-600"></div>
   <span className="flex items-center gap-1">
   <ClockIcon className="w-3 h-3" />
   <span className="font-bold">Last updated at:</span> {formatDateForDisplay(updatedAt)}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default ToDoItemAudit;
