import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../../../../utils/date';
import Flex from '../../../../../common/layout/Flex';
import Stack from '../../../../../common/layout/Stack';

const ToDoItemAudit = ({ createdAt, updatedAt }) => {
    return (
        <>
            <div className="border-t border-slate-700 mt-3 mb-3 -mx-4" />
            <Flex gap="4" className="text-xs text-slate-500">
          <Stack spacing="1" direction="horizontal" align="center">
     <CalendarIcon className="w-3 h-3" />
   <span className="font-bold">Created at:</span>
         <span>{formatDate(createdAt)}</span>
            </Stack>

         {updatedAt && (
 <>
     <div className="h-4 w-px bg-slate-600 mx-2" />
             <Stack spacing="1" direction="horizontal" align="center">
         <ClockIcon className="w-3 h-3" />
 <span className="font-bold">Last updated at:</span>
     <span>{formatDate(updatedAt)}</span>
         </Stack>
           </>
     )}
     </Flex>
 </>
    );
};

export default ToDoItemAudit;
