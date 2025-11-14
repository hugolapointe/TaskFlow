import { cn } from '@utils/cn';
import Flex from '@common/layout/Flex';
import Stack from '@common/layout/Stack';
import PriorityToggle from '@features/toDos/common/inputs/PriorityToggle';
import DescriptionLabel from '@features/toDos/common/display/DescriptionLabel';
import DueDateLabel from '@features/toDos/common/display/DueDateLabel';
import EditButton from '@features/toDos/common/buttons/EditButton';
import CompleteButton from '@features/toDos/common/buttons/CompleteButton';
const ToDoItemView = ({ todo, onEdit, onComplete, onTogglePriority, disabled }) => {
    return (
        <Flex responsive gap="2">
            <Flex grow gap="3">
                <PriorityToggle
                    isPriority={todo.isPriority}
                    onToggle={onTogglePriority}
                    disabled={disabled || todo.isCompleted}
                />

                <DescriptionLabel
                    description={todo.description}
                    isCompleted={todo.isCompleted}
                />
            </Flex>

            <Flex justify="between" gap="3">
                <DueDateLabel
                    dueDate={todo.dueDate}
                    isCompleted={todo.isCompleted}
                />

                <Flex gap="3" align="center">
                    <EditButton onClick={onEdit} />
                    {!todo.isCompleted && <CompleteButton onClick={onComplete} />}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ToDoItemView;
