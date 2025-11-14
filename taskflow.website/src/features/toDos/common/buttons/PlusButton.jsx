import { PlusIcon } from '@heroicons/react/24/outline';

const PlusButton = ({ disabled = false }) => {
    return (
        <button
  type="submit"
         disabled={disabled}
 className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Add Task"
        >
    <PlusIcon className="w-5 h-5" />
        </button>
    );
};

export default PlusButton;
