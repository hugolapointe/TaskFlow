import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaskContext';

export const TaskStats = () => {
    const { stats } = useContext(TaskContext);

    return (
        <div style={{
            textAlign: 'center',
        }}>
            <strong>Total :</strong> {stats.total}
            <span style={{ margin: '0 15px' }}>|</span>
            <strong>Priority :</strong> {stats.priority}
        </div>
    );
};
