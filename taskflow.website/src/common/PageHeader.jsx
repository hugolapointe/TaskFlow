import { SparklesIcon } from '@heroicons/react/24/solid';

const PageHeader = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="max-w-[900px] mx-auto px-12 py-4">
   <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
   <SparklesIcon className="w-6 h-6 text-yellow-400" />
      <h1 className="text-2xl font-bold text-slate-100">TaskFlow</h1>
   </div>
 <div className="h-6 w-px bg-slate-600"></div>
   <p className="text-sm text-slate-400">Get things done, one task at a time</p>
        </div>
   </div>
    </header>
  );
};

export default PageHeader;
