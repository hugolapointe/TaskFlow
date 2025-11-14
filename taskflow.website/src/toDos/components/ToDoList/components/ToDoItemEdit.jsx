import Flex from '../../../../common/layout/Flex';
import Stack from '../../../../common/layout/Stack';
import PriorityToggle from '../../../common/PriorityToggle';
import DescriptionInput from '../../../common/DescriptionInput';
import DueDatePicker from '../../../common/DueDatePicker';
import SaveButton from '../../../common/SaveButton';
import CancelButton from '../../../common/CancelButton';

const ToDoItemEdit = ({ description, setDescription, dueDate, setDueDate, isPriority, onTogglePriority, onSave, onCancel, isSubmitting }) => {
    return (
        <Flex responsive align="center" gap="2 sm:gap-3">
            <Flex gap="3" className="sm:contents">
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

            <Stack spacing="2">
                <DueDatePicker
                    value={dueDate}
                    onChange={setDueDate}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 sm:w-44"
                />

                <Stack spacing="2" shrink>
                    <SaveButton onClick={onSave} disabled={isSubmitting} />
                    <CancelButton onClick={onCancel} disabled={isSubmitting} />
                </Stack>
            </Stack>
        </Flex>
    );
};

export default ToDoItemEdit;
