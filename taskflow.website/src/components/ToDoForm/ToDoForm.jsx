import { useState, useEffect } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { 
  StarIcon, 
  CheckIcon, 
  PlusIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import styles from './ToDoForm.module.css';

const ToDoForm = ({ selectedTodoId, onClearSelection }) => {
  const { todos, actions } = useToDos();
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  const selectedTodo = selectedTodoId ? todos.find(t => t.id === selectedTodoId) : null;
  const isEditing = !!selectedTodo;

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
        await actions.update(selectedTodo.id, {
          description,
      dueDate: dueDate || null,
       isPriority,
        });
      } else {
        await actions.create({
     description,
        dueDate: dueDate || null,
 isPriority,
        });
        resetForm();
      }
    } catch (error) {
    console.error('Error handleSubmit:', error);
    }
  };

  const togglePriority = () => {
    setIsPriority(!isPriority);
  };

  return (
 <div className={`${styles.container} ${isEditing ? styles.editing : ''}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <button
            type="button"
     onClick={togglePriority}
            className={styles.priorityButton}
  title={isPriority ? 'Remove priority' : 'Mark as priority'}
          >
    {isPriority ? (
          <StarIconSolid className={`${styles.priorityIcon} ${styles.active}`} />
            ) : (
      <StarIcon className={`${styles.priorityIcon} ${styles.inactive}`} />
   )}
      </button>

  <div className={styles.inputGroup}>
            {/* Pas d'icône - simplifié */}
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
        {/* Pas d'icône - on garde uniquement celle du navigateur */}
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

          <button 
         type="submit" 
            className={`${styles.submitButton} ${isEditing ? styles.editing : ''}`}
            title={selectedTodo ? 'Update task' : 'Create task'}
          >
            {selectedTodo ? (
 <CheckIcon className={styles.submitIcon} />
    ) : (
              <PlusIcon className={styles.submitIcon} />
    )}
          </button>
     </div>
      </form>
    </div>
  );
};

export default ToDoForm;
