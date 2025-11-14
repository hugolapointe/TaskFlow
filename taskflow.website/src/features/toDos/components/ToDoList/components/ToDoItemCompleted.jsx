import Flex from '@common/layout/Flex';
import PriorityToggle from '@features/toDos/common/inputs/PriorityToggle';
import DescriptionLabel from '@features/toDos/common/display/DescriptionLabel';
import DueDateLabel from '@features/toDos/common/display/DueDateLabel';
import EditButton from '@features/toDos/common/buttons/EditButton';
import ArchiveButton from '@features/toDos/common/buttons/ArchiveButton';

const ToDoItemCompleted = ({ todo, onEdit, onArchive, onTogglePriority, disabled }) => {
 return (
   <Flex responsive gap="2">
   <Flex grow gap="3">
   <PriorityToggle
   isPriority={todo.isPriority}
    onToggle={onTogglePriority}
 disabled={true}
   />

     <DescriptionLabel 
    description={todo.description}
   isCompleted={true}
   />
</Flex>

     <Flex justify="between" gap="3">
   <DueDateLabel 
        dueDate={todo.dueDate}
   isCompleted={true}
    />
     
  <Flex gap="3" align="center">
 <EditButton onClick={onEdit} />
     <ArchiveButton onClick={onArchive} />
     </Flex>
 </Flex>
  </Flex>
    );
};

export default ToDoItemCompleted;
