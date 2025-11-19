import { useContext } from 'react';

import { TaskContext } from '../contexts/TaskContext';

import { Task } from './Task';

export const TaskList = () => {
    const { tasks } = useContext(TaskContext);

    return (
        <>
            {tasks && tasks.length > 0 ? (
                tasks.map(task => <Task key={task.id} task={task} />)
            ) : (
                <p>No task to show.</p>
            )}
        </>
    );
};
