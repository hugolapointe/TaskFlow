import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoContext';

export const useToDos = () => {
    const context = useContext(ToDoContext);

    if (!context) {
        throw new Error('useToDos must be used within a ToDoProvider');
    }

    return context;
};
