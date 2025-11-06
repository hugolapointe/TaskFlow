import './App.css';
import { ToDoProvider } from './contexts/ToDoContext';
import ToDoCreateForm from './components/ToDoCreateForm';
import ToDoList from './components/ToDoList';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <ToDoProvider>
      <div className="app">
        <AppHeader />
        <main className="main-content">
          <ToDoCreateForm />
          <ToDoList />
        </main>
      </div>
    </ToDoProvider>
  );
}

export default App;
