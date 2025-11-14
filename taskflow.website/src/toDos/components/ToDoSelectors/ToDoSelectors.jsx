import { FunnelIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import Stack from '../../../common/layout/Stack';
import StatusSelect from './components/StatusSelect';
import PrioritySelect from './components/PrioritySelect';
import SortSelect from './components/SortSelect';

const ToDoSelectors = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Stack spacing="2" align="center">
                <FunnelIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <StatusSelect />
            </Stack>

            <Stack spacing="2" align="center">
                <FunnelIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <PrioritySelect />
            </Stack>

            <Stack spacing="2" align="center">
                <BarsArrowUpIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <SortSelect />
            </Stack>
        </div>
    );
};

export default ToDoSelectors;
