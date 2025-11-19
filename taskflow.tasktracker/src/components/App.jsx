import { useState } from 'react'

import { TaskProvider } from '../contexts/TaskContext'

import { Button } from "./Button"
import { TaskList } from "./TaskList"
import { AddTaskForm } from "./AddTaskForm"

export const App = () => {
  const [isFormVisible, setFormVisibility] = useState(false);

  return (
    <TaskProvider>
      <div className="container">
        <header>
          <h1>Task-Tracker</h1>
          <Button text={isFormVisible ? 'Close' : 'Add'}
                  color={isFormVisible ? 'red' : 'green'}
                  onClick={() => setFormVisibility(!isFormVisible)}
          />
        </header>
        {isFormVisible && <AddTaskForm />}
        <TaskList />
      </div>
    </TaskProvider>
  );
};
