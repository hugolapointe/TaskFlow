import { memo } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { isOverdue } from '../../utils/toDoUtils';
import { confirmArchive } from '../../utils/confirmations';
import ToDoItemContent from './components/ToDoItemContent';
import ToDoItemAction from './components/ToDoItemAction';
import ToDoItemAudit from './components/ToDoItemAudit';
import styles from './ToDoItem.module.css';

const ToDoItem = memo(({ todo, isSelected, onSelectTodo, onClearSelection }) => {
  const { actions } = useToDos();

  const isTaskOverdue = isOverdue(todo.dueDate, todo.isCompleted);

  const handleClick = () => {
    if (isSelected) {
      onClearSelection();
    } else {
      onSelectTodo(todo.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    if (todo.isCompleted) {
      if (confirmArchive()) {
        actions.archive(todo.id);
        if (isSelected) {
          onClearSelection();
        }
      }
    } else {
      actions.toggleComplete(todo.id);
    }
  };

  const handleTogglePriority = (e) => {
    e.stopPropagation();
    actions.togglePriority(todo.id);
  };

  return (
    <div
      className={styles.container}
      data-selected={isSelected}
      data-completed={todo.isCompleted}
      data-priority={todo.isPriority}
      onClick={handleClick}
    >
      <div className={styles.mainContent}>
        <ToDoItemContent
          todo={todo}
          isOverdue={isTaskOverdue}
          onTogglePriority={handleTogglePriority}
        />
        <ToDoItemAction
          todo={todo}
          onComplete={handleComplete}
        />
      </div>

      {isSelected && <ToDoItemAudit todo={todo} />}
    </div>
  );
});

ToDoItem.displayName = 'ToDoItem';

export default ToDoItem;
