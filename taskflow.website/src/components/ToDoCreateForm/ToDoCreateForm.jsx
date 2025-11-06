import { useState } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { PlusIcon } from '@heroicons/react/24/outline';
import styles from './ToDoCreateForm.module.css';

const ToDoCreateForm = () => {
    const { actions, loading } = useToDos();
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;

        await actions.create({
            description: description.trim(),
            dueDate: dueDate || null
        });

        // Reset form
        setDescription('');
        setDueDate('');
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a new task..."
                            className={styles.input}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={`${styles.input} ${styles.dateInput}`}
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading || !description.trim()}
                        title="Add task"
                    >
                        <PlusIcon className={styles.submitIcon} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ToDoCreateForm;
