import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { TaskContext } from '../contexts/TaskContext';

export const Task = ({ id, description, dueDate, isPriority }) => {
    const { deleteTask, toggleTaskPriority } = useContext(TaskContext);

    return (
        <div
            className={`task ${isPriority ? 'priority' : ''}`}
            onDoubleClick={() => toggleTaskPriority(id)}
        >
            <h3>
                {description}
                <XMarkIcon
                    style={{
                        color: 'red',
                        cursor: 'pointer',
                        width: '20px',
                        height: '20px',
                        display: 'inline-block'
                    }}
                    onClick={() => deleteTask(id)}
                />
            </h3>
            <p>{new Date(dueDate).toLocaleDateString()}</p>
        </div>
    );
};
