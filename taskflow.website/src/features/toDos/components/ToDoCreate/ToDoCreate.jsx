import { useState } from 'react';
import { useToDos } from '../../context/ToDoContext';
import { VALIDATION_MESSAGES } from '../../constants/toDoConstants';
import toast from 'react-hot-toast';
import Card from '@common/surfaces/Card';
import Flex from '@common/layout/Flex';
import Stack from '@common/layout/Stack';
import PriorityToggle from '../../common/inputs/PriorityToggle';
import DescriptionInput from '../../common/inputs/DescriptionInput';
import DueDatePicker from '../../common/inputs/DueDatePicker';
import PlusButton from '../../common/buttons/PlusButton';

const ToDoCreate = () => {
    const { addTodo } = useToDos();
    
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

        try {
            await addTodo(newToDo);
            setDescription('');
            setDueDate('');
            setIsPriority(false);
        } catch (error) {
            // Toast déjà affiché par l'action
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

                        <PlusButton />
                    </Stack>
                </Flex>
            </form>
        </Card>
    );
};

export default ToDoCreate;
