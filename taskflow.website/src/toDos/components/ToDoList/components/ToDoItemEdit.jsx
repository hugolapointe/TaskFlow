import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import IconButton from '../../../../common/IconButton';
import PriorityToggle from '../../../common/PriorityToggle';
import DescriptionInput from '../../../common/DescriptionInput';
import DueDatePicker from '../../../common/DueDatePicker';

const ToDoItemEdit = ({ description, setDescription, dueDate, setDueDate, isPriority, onTogglePriority, onSave, onCancel, isSubmitting }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-3 sm:contents">
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
      </div>

      <div className="flex items-center gap-2">
        <DueDatePicker
          value={dueDate}
          onChange={setDueDate}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 sm:w-44"
        />

        <div className="flex items-center gap-2 flex-shrink-0">
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
    </div>
  );
};

export default ToDoItemEdit;
