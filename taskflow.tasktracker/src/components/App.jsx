import { useState, useContext } from 'react'

import { TaskProvider, TaskContext } from '../contexts/TaskContext'

import { Button } from "./Button"
import { TaskList } from "./TaskList"
import { AddTaskForm } from "./AddTaskForm"
import { TaskStats } from "./TaskStats"

const AppContent = () => {
    const [isFormVisible, setFormVisibility] = useState(false);
    const { loading, error } = useContext(TaskContext);

    return (
        <div className="container">
            <header>
                <h1>Task-Tracker</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        text={isFormVisible ? 'Close' : 'Add'}
                        color={isFormVisible ? 'red' : 'green'}
                        onClick={() => setFormVisibility(!isFormVisible)}
                    />
                </div>
            </header>

            {loading && <div className="loading">⏳ Loading...</div>}
            {error && <div className="error">❌ Error: {error}</div>}

            <TaskStats />

            {isFormVisible && <AddTaskForm />}
            <TaskList />
        </div>
    );
};

export const App = () => {
    return (
        <TaskProvider>
            <AppContent />
        </TaskProvider>
    );
};
