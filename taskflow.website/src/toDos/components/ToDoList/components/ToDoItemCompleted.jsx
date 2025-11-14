import Flex from '../../../../common/layout/Flex';
import PriorityToggle from '../../../common/inputs/PriorityToggle';
import DescriptionLabel from '../../../common/display/DescriptionLabel';
import DueDateLabel from '../../../common/display/DueDateLabel';
import EditButton from '../../../common/buttons/EditButton';
import ArchiveButton from '../../../common/buttons/ArchiveButton';

const ToDoItemCompleted = ({ todo, onEdit, onArchive, onTogglePriority, disabled }) => {
    return (
        <Flex responsive align="center" gap="2 sm:gap-3">
            <Flex grow gap="3" align="center">
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
