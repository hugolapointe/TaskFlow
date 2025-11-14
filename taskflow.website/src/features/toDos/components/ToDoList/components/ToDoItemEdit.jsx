import Flex from '@common/layout/Flex';
import PriorityToggle from '@features/toDos/common/inputs/PriorityToggle';
import DescriptionInput from '@features/toDos/common/inputs/DescriptionInput';
import DueDatePicker from '@features/toDos/common/inputs/DueDatePicker';
import SaveButton from '@features/toDos/common/buttons/SaveButton';
import CancelButton from '@features/toDos/common/buttons/CancelButton';

const ToDoItemEdit = ({ description, setDescription, dueDate, setDueDate, isPriority, onTogglePriority, onSave, onCancel, isSubmitting }) => {
    return (
        <Flex responsive gap="2" className="min-h-[40px]">
      <Flex grow gap="3" align="center">
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

   <Flex justify="between" gap="3" align="center">
     <DueDatePicker
      value={dueDate}
       onChange={setDueDate}
   onClick={(e) => e.stopPropagation()}
     />

    <Flex gap="3" align="center" shrink={false} className="w-[68px] justify-end">
   <SaveButton onClick={onSave} disabled={isSubmitting} />
  <CancelButton onClick={onCancel} disabled={isSubmitting} />
   </Flex>
  </Flex>
        </Flex>
    );
};

export default ToDoItemEdit;
