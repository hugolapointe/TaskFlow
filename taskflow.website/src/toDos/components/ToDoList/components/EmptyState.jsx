import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Stack from '../../../../common/layout/Stack';

const EmptyState = () => {
    return (
        <Stack direction="vertical" spacing="4" align="center" className="py-12">
            <DocumentTextIcon className="w-16 h-16 text-slate-600" />
            <Stack direction="vertical" spacing="2" align="center">
                <h2 className="text-xl font-semibold text-slate-100">
                    No tasks yet
                </h2>
                <p className="text-slate-400 text-center max-w-md text-sm">
                    Start by creating your first task above. Stay organized and track your progress with ease!
                </p>
            </Stack>
        </Stack>
    );
};

export default EmptyState;
