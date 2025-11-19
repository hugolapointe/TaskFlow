import { useContext } from 'react';

import { TaskContext } from '../contexts/TaskContext';

import { Task } from './Task';

export const TaskList = () => {
    const { tasks } = useContext(TaskContext);

    return (
        <>
            {tasks && tasks.length > 0 ? (
                tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        dueDate={task.dueDate}
                        isPriority={task.isPriority}
                    />
                ))
            ) : (
                <p>No task to show.</p>
            )}
        </>
    );
};
