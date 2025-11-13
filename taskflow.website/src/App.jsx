import { Toaster } from 'react-hot-toast';
import { ToDoProvider } from './context/ToDoContext';
import TodosPage from './toDos/pages/TodosPage';

function App() {
  return (
    <ToDoProvider>
  <TodosPage />
      <Toaster position="top-right" />
    </ToDoProvider>
  );
}

export default App;
