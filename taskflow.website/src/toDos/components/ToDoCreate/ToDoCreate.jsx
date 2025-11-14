import { useState } from 'react';
import { useAsyncAction } from '../../../hooks/useAsyncAction';
import { useToDoState } from '../../../hooks/useToDoState';
import { createToDo } from '../../../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../../utils/constants';
import { calculateCreationDelta } from '../../../utils/todoHelpers';
import toast from 'react-hot-toast';
import Card from '../../../common/surfaces/Card';
import Flex from '../../../common/layout/Flex';
import Stack from '../../../common/layout/Stack';
import PriorityToggle from '../../common/inputs/PriorityToggle';
import DescriptionInput from '../../common/inputs/DescriptionInput';
import DueDatePicker from '../../common/inputs/DueDatePicker';
import PlusButton from '../../common/buttons/PlusButton';

const ToDoCreate = () => {
    const { execute, isLoading } = useAsyncAction();
    const { addTodo, updateStats } = useToDoState();
    
	const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isPriority, setIsPriority] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            toast.error(VALIDATION_MESSAGES.DESCRIPTION_REQUIRED);
            return;
        }

        const newToDo = {
            description: description.trim(),
            dueDate: dueDate || null,
            isPriority,
        };

        const result = await execute(
            async () => {
                const createdToDo = await createToDo(newToDo);

                addTodo(createdToDo);

                const statsDelta = calculateCreationDelta(createdToDo);
                updateStats(statsDelta);

                return createdToDo;
            },
            {
                successMessage: SUCCESS_MESSAGES.CREATE,
                errorMessage: ERROR_MESSAGES.CREATE
            }
        );

        if (result.success) {
            setDescription('');
            setDueDate('');
            setIsPriority(false);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <Flex responsive align="center" gap="3">
                    <Flex gap="3" className="sm:contents">
                        <PriorityToggle
                            isPriority={isPriority}
                            onToggle={() => setIsPriority(!isPriority)}
                        />

                        <DescriptionInput
                            value={description}
                            onChange={setDescription}
                        />
                    </Flex>

                    <Stack spacing="3">
                        <DueDatePicker
                            value={dueDate}
                            onChange={setDueDate}
                        />

                        <PlusButton disabled={isLoading} />
                    </Stack>
                </Flex>
            </form>
        </Card>
    );
};

export default ToDoCreate;
