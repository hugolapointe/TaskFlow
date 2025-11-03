import { useState, useEffect } from 'react';
import { useToDos } from '../../contexts/ToDoContext';

const ToDoForm = () => {
  const { selectedTodo, createTodo, updateTodo, clearSelection, changePriority } = useToDos();
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isPriority, setIsPriority] = useState(false);

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

    if (!description.trim()) return;

    try {
      if (selectedTodo) {
   const priorityChanged = selectedTodo.isPriority !== isPriority;

    await updateTodo(selectedTodo.id, {
      description,
          dueDate: dueDate || null,
        });

        if (priorityChanged) {
          await changePriority(selectedTodo.id, true);
    }

      clearSelection();
    } else {
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
    <div className="bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
 <h2 className="text-xl font-semibold text-white">
     {selectedTodo ? 'Edit Task' : 'New Task'}
        </h2>
      {selectedTodo && (
  <button
  onClick={handleCancel}
      className="text-gray-400 hover:text-gray-300 transition-colors p-1"
            aria-label="Cancel editing"
    >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
       </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <button
type="button"
     onClick={() => setIsPriority(false)}
            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
        !isPriority
    ? 'bg-gray-700 border-gray-600 text-white shadow-sm'
       : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
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
      ? 'bg-amber-900 border-amber-700 text-amber-100 shadow-lg shadow-amber-900/50'
       : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
    <svg 
       className={`w-5 h-5 transition-all ${isPriority ? 'fill-amber-400 scale-110' : 'fill-gray-400'}`} 
         viewBox="0 0 24 24"
    >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
         </svg>
       High Priority
     </button>
        </div>

      <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
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
    className="w-full pl-11 pr-4 py-3 text-base bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
          required
      />
        </div>

        <div className="relative">
     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10">
   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
  </div>
 <input
 id="dueDate"
    type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due date"
    className="w-full pl-11 pr-4 py-3 text-base bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
            onFocus={(e) => e.target.showPicker?.()}
       />
        </div>

      <button
       type="submit"
     className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {selectedTodo ? (
      <>
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
       <path d="M5 13l4 4L19 7"></path>
    </svg>
              Update
            </>
          ) : (
        <>
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
     <path d="M12 4v16m8-8H4"></path>
              </svg>
        Create
    </>
        )}
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
