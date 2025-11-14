import { Toaster } from 'react-hot-toast';
import { ToDoProvider } from '@features/toDos/context/ToDoContext';
import { FilterProvider } from '@features/toDos/context/FilterContext';
import TodosPage from '@features/toDos/pages/TodosPage';

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
