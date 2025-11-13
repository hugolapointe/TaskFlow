import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import IconButton from '../../../../common/IconButton';
import PriorityToggle from '../../../../common/PriorityToggle';
import DescriptionInput from '../../../../common/DescriptionInput';
import DueDatePicker from '../../../../common/DueDatePicker';

/**
 * ToDoItemEdit component - Presentational component for task editing
 *
 * @param {Object} props
 * @param {string} props.description - Task description
 * @param {Function} props.setDescription - Function to set task description
 * @param {string} props.dueDate - Task due date
 * @param {Function} props.setDueDate - Function to set task due date
 * @param {boolean} props.isPriority - Task priority flag
 * @param {Function} props.onTogglePriority - Function to toggle task priority
 * @param {Function} props.onSave - Function to save changes
 * @param {Function} props.onCancel - Function to cancel editing
 * @param {boolean} props.isSubmitting - Form submission state
 */
const ToDoItemEdit = ({ description, setDescription, dueDate, setDueDate, isPriority, onTogglePriority, onSave, onCancel, isSubmitting }) => {
  return (
    <div className="flex items-center gap-3">
      <PriorityToggle
        isPriority={isPriority}
        onToggle={onTogglePriority}
        disabled={false}
      />

      <DescriptionInput
        value={description}
        onChange={setDescription}
        onClick={(e) => e.stopPropagation()}
        placeholder="Task description"
      />

      <DueDatePicker
        value={dueDate}
        onChange={setDueDate}
        onClick={(e) => e.stopPropagation()}
        className="w-44"
      />

      <div className="flex items-center gap-2">
        <IconButton
          icon={<CheckIcon className="w-5 h-5" />}
          label="Save"
          variant="success"
          onClick={onSave}
          disabled={isSubmitting}
        />
        <IconButton
          icon={<XMarkIcon className="w-5 h-5" />}
          label="Cancel"
          variant="danger"
          onClick={onCancel}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ToDoItemEdit;
