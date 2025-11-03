import { useState, useEffect } from 'react';
import { useTodos } from '../contexts/TodoContext';

const TodoForm = () => {
  const { selectedTodo, createTodo, updateTodo, clearSelection } = useTodos();
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  // Fill form when a task is selected
  useEffect(() => {
  if (selectedTodo) {
      setDescription(selectedTodo.description || '');
      setDueDate(selectedTodo.dueDate || '');
      setIsPriority(selectedTodo.isPriority || false);
    } else {
 resetForm();
    }
  }, [selectedTodo]);

  const resetForm = () => {
    setDescription('');
    setDueDate('');
    setIsPriority(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      return;
    }

    try {
      if (selectedTodo) {
        // Edit mode
  await updateTodo(selectedTodo.id, {
  description,
          dueDate: dueDate || null,
        });
        clearSelection();
      } else {
        // Create mode
        await createTodo({
          description,
          dueDate: dueDate || null,
          isPriority,
        });
   }
      resetForm();
    } catch (error) {
      console.error('Error handleSubmit:', error);
    }
  };

  const handleCancel = () => {
    clearSelection();
    resetForm();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      {/* Header with edit indicator */}
      {selectedTodo && (
  <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-100">
          <div className="flex items-center gap-2 text-blue-600">
         <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
     <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span className="font-semibold">Editing task</span>
          </div>
    <button
      onClick={handleCancel}
  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Cancel editing"
 >
 <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M6 18L18 6M6 6l12 12"></path>
       </svg>
          </button>
        </div>
      )}
      
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Priority Toggle - First decision */}
        {!selectedTodo && (
          <div className="flex gap-3">
            <button
     type="button"
       onClick={() => setIsPriority(false)}
    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
           !isPriority
                  ? 'bg-gray-50 border-gray-400 text-gray-700 shadow-sm'
: 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
           }`}
            >
   <svg className="w-5 h-5 fill-gray-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
         </svg>
          Normal
   </button>
            <button
     type="button"
              onClick={() => setIsPriority(true)}
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
      isPriority
       ? 'bg-gradient-to-br from-red-500 to-pink-500 border-red-400 text-white shadow-lg shadow-red-200'
           : 'bg-white border-gray-300 text-gray-500 hover:border-red-400'
              }`}
    >
         <svg 
                className={`w-5 h-5 transition-all ${
       isPriority ? 'fill-white scale-110' : 'fill-gray-400'
    }`} 
       viewBox="0 0 24 24"
         >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
        High Priority
     </button>
    </div>
        )}

   {/* Description Input with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
   <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
          </div>
          <input
            id="description"
   type="text"
            value={description}
    onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
className="w-full pl-11 pr-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
required
          />
   </div>

        {/* Due Date with icon */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
        </div>
          <input
         id="dueDate"
          type="date"
            value={dueDate}
     onChange={(e) => setDueDate(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
    {selectedTodo ? (
            <>
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
     <path d="M5 13l4 4L19 7"></path>
              </svg>
      Update Task
      </>
   ) : (
         <>
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 4v16m8-8H4"></path>
         </svg>
       Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
