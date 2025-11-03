import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToDoProvider } from './contexts/ToDoContext';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <ToDoProvider>
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
   <header className="mb-8">
     <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
   <div className="flex items-center gap-3">
     <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
         <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
         </svg>
       <h1 className="text-4xl font-bold text-white">
      TaskFlow
         </h1>
     </div>
     <span className="hidden sm:block text-gray-700 text-2xl font-light">|</span>
       <p className="text-gray-400 text-lg">
       Get stuff done, one task at a time
     </p>
            </div>
      </header>

      <ToDoForm />
        <ToDoList />
        </div>
      </div>

      <ToastContainer
   position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
    newestOnTop
     closeOnClick
 pauseOnFocusLoss
     pauseOnHover
theme="dark"
      />
    </ToDoProvider>
  );
}

export default App;
