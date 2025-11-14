import { FunnelIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import StatusSelect from './components/StatusSelect';
import PrioritySelect from './components/PrioritySelect';
import SortSelect from './components/SortSelect';

const ToDoSelectors = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <StatusSelect />
            </div>

            <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <PrioritySelect />
            </div>

            <div className="flex items-center gap-2">
                <BarsArrowUpIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <SortSelect />
            </div>
        </div>
    );
};

export default ToDoSelectors;
