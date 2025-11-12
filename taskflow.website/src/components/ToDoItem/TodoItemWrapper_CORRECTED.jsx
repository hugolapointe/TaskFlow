import { useState } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import { confirmArchive } from '../../utils/confirmations';
import TodoItem from './components/ToDoItem/TodoItem';
import TodoItemEdit from './components/ToDoItemEdit/TodoItemEdit';

const TodoItemWrapper = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateTodo, togglePriority, toggleComplete, archiveTodo } = useTodos();

    const handleSave = async (updates) => {
  await updateTodo(todo.id, updates);
        setIsEditing(false);
    };

 const handleCancel = () => {
        setIsEditing(false);
    };

    const handleTogglePriority = async () => {
        await togglePriority(todo.id);
    };

    const handleCompleteOrArchive = async () => {
  if (todo.isCompleted) {
     if (confirmArchive()) {
      await archiveTodo(todo.id);
            }
      } else {
            await toggleComplete(todo.id);
        }
    };

    if (isEditing) {
        return (
            <TodoItemEdit
      todo={todo}
                onSave={handleSave}
             onCancel={handleCancel}
     />
      );
    }

    return (
        <TodoItem
        todo={todo}
            onEdit={() => setIsEditing(true)}
            onTogglePriority={handleTogglePriority}
        onCompleteOrArchive={handleCompleteOrArchive}
        />
    );
};

export default TodoItemWrapper;
