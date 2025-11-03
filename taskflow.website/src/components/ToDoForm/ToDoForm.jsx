import { useState, useEffect } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { 
    XMarkIcon, 
    StarIcon, 
    DocumentTextIcon, 
    CalendarIcon, 
    CheckIcon, 
    PlusIcon 
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import styles from './ToDoForm.module.css';

const ToDoForm = () => {
    const { selectedTodo, createTodo, updateTodo, clearSelection, changePriority } = useToDos();
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isPriority, setIsPriority] = useState(false);

    useEffect(() => {
        if (selectedTodo) {
            setDescription(selectedTodo.description || '');
            setDueDate(selectedTodo.dueDate || '');
            setIsPriority(selectedTodo.isPriority || false);
        } else {
            resetForm();
        }
    }, [selectedTodo]);

    const resetForm = () => {
        setDescription('');
        setDueDate('');
        setIsPriority(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) return;

        try {
            if (selectedTodo) {
                const priorityChanged = selectedTodo.isPriority !== isPriority;

                await updateTodo(selectedTodo.id, {
                    description,
                    dueDate: dueDate || null,
                });

                if (priorityChanged) {
                    await changePriority(selectedTodo.id, true);
                }

                clearSelection();
            } else {
                await createTodo({
                    description,
                    dueDate: dueDate || null,
                    isPriority,
                });
            }
            resetForm();
        } catch (error) {
            console.error('Error handleSubmit:', error);
        }
    };

    const handleCancel = () => {
        clearSelection();
        resetForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {selectedTodo ? 'Edit Task' : 'New Task'}
                </h2>
                {selectedTodo && (
                    <button
                        onClick={handleCancel}
                        className={styles.cancelButton}
                        aria-label="Cancel editing"
                    >
                        <XMarkIcon className={styles.cancelIcon} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.priorityToggle}>
                    <button
                        type="button"
                        onClick={() => setIsPriority(false)}
                        className={`${styles.priorityButton} ${!isPriority ? styles.normal : styles.normalInactive}`}
                    >
                        <StarIcon className={styles.priorityIcon} />
                        Normal
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsPriority(true)}
                        className={`${styles.priorityButton} ${isPriority ? styles.priority : styles.priorityInactive}`}
                    >
                        {isPriority ? (
                            <StarIconSolid className={`${styles.priorityIcon} ${styles.active}`} />
                        ) : (
                            <StarIcon className={`${styles.priorityIcon} ${styles.inactive}`} />
                        )}
                        High Priority
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputIcon}>
                        <DocumentTextIcon />
                    </div>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What needs to be done?"
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputIcon}>
                        <CalendarIcon />
                    </div>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        placeholder="Due date"
                        className={`${styles.input} ${styles.dateInput}`}
                        onFocus={(e) => e.target.showPicker?.()}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    {selectedTodo ? (
                        <>
                            <CheckIcon className={styles.submitIcon} />
                            Update
                        </>
                    ) : (
                        <>
                            <PlusIcon className={styles.submitIcon} />
                            Create
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ToDoForm;
