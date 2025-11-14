import Flex from '../../../../../common/layout/Flex';
import PriorityToggle from '../../../common/inputs/PriorityToggle';
import DescriptionInput from '../../../common/inputs/DescriptionInput';
import DueDatePicker from '../../../common/inputs/DueDatePicker';
import SaveButton from '../../../common/buttons/SaveButton';
import CancelButton from '../../../common/buttons/CancelButton';

const ToDoItemEdit = ({ description, setDescription, dueDate, setDueDate, isPriority, onTogglePriority, onSave, onCancel, isSubmitting }) => {
    return (
        <Flex responsive gap="2">
      <Flex grow gap="3">
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
  </Flex>

   <Flex justify="between" gap="3">
     <DueDatePicker
      value={dueDate}
       onChange={setDueDate}
   onClick={(e) => e.stopPropagation()}
     />

    <Flex gap="3" align="center">
   <SaveButton onClick={onSave} disabled={isSubmitting} />
  <CancelButton onClick={onCancel} disabled={isSubmitting} />
   </Flex>
  </Flex>
        </Flex>
    );
};

export default ToDoItemEdit;
