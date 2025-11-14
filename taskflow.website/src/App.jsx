import { Toaster } from 'react-hot-toast';
import { ToDoProvider } from './context/ToDoContext';
import { FilterProvider } from './context/FilterContext';
import TodosPage from './toDos/pages/TodosPage';

function App() {
  return (
    <ToDoProvider>
      <FilterProvider>
        <TodosPage />
        <Toaster position="top-right" />
      </FilterProvider>
    </ToDoProvider>
  );
}

export default App;
