import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TodoProvider } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <TodoProvider>
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
      {/* Header */}
     <header className="text-center mb-8">
       <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <div className="flex items-center gap-3">
  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
       <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
 <h1 className="text-4xl font-bold text-gray-800">
              TaskFlow
 </h1>
    </div>
  <span className="hidden sm:block text-gray-400 text-2xl font-light">|</span>
     <p className="text-gray-600 text-lg">
      Get stuff done, one task at a time!
    </p>
            </div>
  </header>

          {/* Form */}
   <TodoForm />

          {/* List */}
       <TodoList />
  </div>
      </div>

  {/* Toast notifications */}
    <ToastContainer
   position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
     draggable
        pauseOnHover
        theme="light"
      />
    </TodoProvider>
  );
}

export default App;
