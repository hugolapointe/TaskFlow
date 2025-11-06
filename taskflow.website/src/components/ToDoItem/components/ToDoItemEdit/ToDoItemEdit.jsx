import { useState } from 'react';
import styles from './ToDoItemEdit.module.css';

const ToDoItemEdit = ({ toDo, onSave, onCancel, isLoading }) => {
    const [description, setDescription] = useState(toDo.description);
    const [dueDate, setDueDate] = useState(toDo.dueDate ? toDo.dueDate.split('T')[0] : '');

    const handleSave = async () => {
        if (!description.trim()) return;
        
        await onSave({
            description: description.trim(),
   dueDate: dueDate || null,
            isPriority: toDo.isPriority
 });
  };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
     } else if (e.key === 'Escape') {
onCancel();
        }
    };

    return (
        <div className={styles.editContainer}>
    <input
 type="text"
 value={description}
        onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
            className={styles.descriptionInput}
 disabled={isLoading}
          autoFocus
       />
    <input
              type="date"
                value={dueDate}
 onChange={(e) => setDueDate(e.target.value)}
    className={styles.dateInput}
    disabled={isLoading}
        />
  <div className={styles.actions}>
    <button
          onClick={handleSave}
         disabled={isLoading || !description.trim()}
         className={styles.saveButton}
   >
         Save
  </button>
      <button
     onClick={onCancel}
     disabled={isLoading}
      className={styles.cancelButton}
     >
     Cancel
                </button>
            </div>
        </div>
    );
};

export default ToDoItemEdit;
