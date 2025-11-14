import { PlusIcon } from '@heroicons/react/24/outline';

const PlusButton = ({ onClick, disabled = false, type = 'submit' }) => {
    return (
   <button
       type={type}
   disabled={disabled}
  onClick={onClick}
     className="flex-shrink-0 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
  aria-label="Create task"
  >
       <PlusIcon className="w-5 h-5" />
 </button>
    );
};

export default PlusButton;
