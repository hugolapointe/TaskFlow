import { SparklesIcon } from '@heroicons/react/24/solid';

const PageHeader = () => {
    return (
        <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
            <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-100">TaskFlow</h1>
                    </div>
                    <div className="hidden sm:block h-6 w-px bg-slate-600"></div>
                    <p className="text-xs sm:text-sm text-slate-400 text-center">Get things done, one task at a time</p>
                </div>
            </div>
        </header>
    );
};

export default PageHeader;
