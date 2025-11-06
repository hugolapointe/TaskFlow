import { memo, useState, useEffect } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { isOverdue, formatDate } from '../../utils/todoUtils';
import { confirmArchive } from '../../utils/confirmations';
import {
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    ExclamationCircleIcon,
    CalendarIcon,
    CheckCircleIcon,
    ArchiveBoxIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import styles from './ToDoItem.module.css';

const ToDoItem = memo(({ todo, isEditing, onEditStart, onEditCancel }) => {
    const { actions } = useToDos();
    const [editForm, setEditForm] = useState({
        description: todo.description,
        dueDate: todo.dueDate || ''
    });

    const isTaskOverdue = isOverdue(todo.dueDate, todo.isCompleted);

    // Reset form when entering edit mode or todo changes
    useEffect(() => {
        if (isEditing) {
         setEditForm({
            description: todo.description,
    dueDate: todo.dueDate || ''
        });
        }
    }, [isEditing, todo.description, todo.dueDate]);

  // ========== Event Handlers ==========

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEditStart();
    };

    const handleSaveClick = async (e) => {
        e.stopPropagation();
        if (!editForm.description.trim()) return;

     await actions.update(todo.id, {
          description: editForm.description.trim(),
            dueDate: editForm.dueDate || null
        });
        onEditCancel();
    };

 const handleCancelClick = (e) => {
    e.stopPropagation();
     onEditCancel();
    };

    const handleCompleteOrArchive = (e) => {
        e.stopPropagation();
        if (todo.isCompleted) {
     if (confirmArchive()) {
      actions.archive(todo.id);
           if (isEditing) onEditCancel();
        }
        } else {
  actions.toggleComplete(todo.id);
if (isEditing) onEditCancel();
        }
    };

 const handleTogglePriority = (e) => {
        e.stopPropagation();
        actions.togglePriority(todo.id);
    };

    const handleDescriptionChange = (e) => {
        setEditForm(prev => ({ ...prev, description: e.target.value }));
    };

    const handleDueDateChange = (e) => {
        setEditForm(prev => ({ ...prev, dueDate: e.target.value }));
    };

    // ========== Render ==========

return (
        <div
            className={styles.container}
     data-editing={isEditing}
 data-completed={todo.isCompleted}
     data-priority={todo.isPriority}
   >
            <div className={styles.mainContent}>
    {/* ===== LEFT SECTION: Priority + Content ===== */}
           <div className={styles.leftSection}>
  {/* Priority Button */}
                <button
    onClick={handleTogglePriority}
className={styles.priorityButton}
             title={todo.isPriority ? 'Remove priority' : 'Mark as priority'}
        >
     <ExclamationCircleIcon
              className={`${styles.priorityIcon} ${todo.isPriority ? styles.active : styles.inactive}`}
     />
     </button>

     {/* Description - Display or Edit */}
 {isEditing ? (
     <input
      type="text"
    value={editForm.description}
     onChange={handleDescriptionChange}
              className={styles.descriptionInput}
          onClick={(e) => e.stopPropagation()}
        autoFocus
      />
    ) : (
   <p className={`${styles.description} ${todo.isCompleted ? styles.completed : styles.active}`}>
    {todo.description}
 </p>
          )}

                {/* Due Date - Display or Edit */}
               {isEditing ? (
       <input
       type="date"
              value={editForm.dueDate}
      onChange={handleDueDateChange}
           className={styles.dueDateInput}
       onClick={(e) => e.stopPropagation()}
          />
            ) : (
       todo.dueDate && (
             <div className={styles.dueDateContainer}>
    <CalendarIcon className={styles.dueDateIcon} />
          <span className={`${styles.dueDate} ${isTaskOverdue ? styles.overdue : ''}`}>
        {todo.dueDate}
          </span>
    </div>
  )
         )}
       </div>

         {/* ===== RIGHT SECTION: Action Buttons ===== */}
    <div className={styles.actionsContainer}>
 {isEditing ? (
        <>
      {/* Save Button */}
      <button
      onClick={handleSaveClick}
         className={styles.saveButton}
              title="Save"
  disabled={!editForm.description.trim()}
               >
<CheckIcon className={styles.actionIcon} />
          </button>

              {/* Cancel Button */}
        <button
           onClick={handleCancelClick}
   className={styles.cancelButton}
                 title="Cancel"
      >
            <XMarkIcon className={styles.actionIcon} />
      </button>
     </>
        ) : (
              <>
      {/* Edit Button */}
  <button
       onClick={handleEditClick}
         className={styles.editButton}
      title="Edit"
              >
          <PencilIcon className={styles.actionIcon} />
  </button>

     {/* Complete/Archive Button */}
   <button
     onClick={handleCompleteOrArchive}
       className={`${styles.actionButton} ${todo.isCompleted ? styles.completed : styles.active}`}
   title={todo.isCompleted ? 'Archive' : 'Complete'}
           >
       {todo.isCompleted ? (
        <ArchiveBoxIcon className={styles.actionIcon} />
          ) : (
  <CheckCircleIcon className={styles.actionIcon} />
  )}
      </button>
   </>
        )}
 </div>
   </div>

            {/* ===== AUDIT SECTION (only in edit mode) ===== */}
  {isEditing && (
          <div className={styles.auditSection}>
       <div className={styles.auditRow}>
   <ClockIcon className={styles.auditIcon} />
    <span className={styles.auditLabel}>Created:</span>
            <span className={styles.auditValue}>{formatDate(todo.createdAt)}</span>
         </div>

   {todo.updatedAt && (
         <>
            <span className={styles.separator}>|</span>
          <div className={styles.auditRow}>
         <ClockIcon className={styles.auditIcon} />
             <span className={styles.auditLabel}>Updated:</span>
 <span className={styles.auditValue}>{formatDate(todo.updatedAt)}</span>
    </div>
        </>
        )}
                </div>
   )}
        </div>
  );
});

ToDoItem.displayName = 'ToDoItem';

export default ToDoItem;
