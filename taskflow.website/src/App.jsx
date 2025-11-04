import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToDoProvider } from './contexts/ToDoContext';
import { TOAST_CONFIG } from './config/toastConfig';
import AppHeader from './components/AppHeader';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';

function App() {
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const handleClearSelection = () => {
    setSelectedTodoId(null);
  };

  return (
    <ToDoProvider>
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <AppHeader />
          <ToDoForm 
            selectedTodoId={selectedTodoId}
            onClearSelection={handleClearSelection}
          />
          <ToDoList 
            selectedTodoId={selectedTodoId}
            onSelectTodo={setSelectedTodoId}
            onClearSelection={handleClearSelection}
          />
        </div>
      </div>
      <ToastContainer {...TOAST_CONFIG} />
    </ToDoProvider>
  );
}

export default App;
