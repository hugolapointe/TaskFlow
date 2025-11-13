import { DocumentTextIcon } from '@heroicons/react/24/outline';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
  <DocumentTextIcon className="w-16 h-16 text-slate-600 mb-4" />
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
     No tasks yet
      </h2>
      <p className="text-slate-400 text-center max-w-md text-sm">
        Start by creating your first task above. Stay organized and track your progress with ease!
 </p>
    </div>
  );
};

export default EmptyState;
