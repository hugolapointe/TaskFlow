import { useState } from 'react';
import { useToDos } from '../../../hooks/useToDos';
import { createToDo } from '../../../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../../utils/constants';
import toast from 'react-hot-toast';
import Card from '../../../common/Card';
import Flex from '../../../common/layout/Flex';
import Stack from '../../../common/layout/Stack';
import PriorityToggle from '../../common/PriorityToggle';
import DescriptionInput from '../../common/DescriptionInput';
import DueDatePicker from '../../common/DueDatePicker';
import PlusButton from '../../common/PlusButton';

const ToDoCreate = () => {
    const { setToDos, setStats } = useToDos();
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isPriority, setIsPriority] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            toast.error(VALIDATION_MESSAGES.DESCRIPTION_REQUIRED);
            return;
        }

        setIsSubmitting(true);

        const newToDo = {
            description: description.trim(),
            dueDate: dueDate || null,
            isPriority,
        };

        try {
            const createdToDo = await createToDo(newToDo);

            setToDos((prev) => [createdToDo, ...prev]);

            setStats((prev) => ({
                total: prev.total + 1,
                priority: createdToDo.isPriority ? prev.priority + 1 : prev.priority,
                nonPriority: !createdToDo.isPriority ? prev.nonPriority + 1 : prev.nonPriority,
                completed: prev.completed,
            }));

            setDescription('');
            setDueDate('');
            setIsPriority(false);

            toast.success(SUCCESS_MESSAGES.CREATE);
        } catch (error) {
            toast.error(ERROR_MESSAGES.CREATE);
            console.error(error);
        } finally {
            setIsSubmitting(false);
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
                            className="flex-1 sm:w-44"
                        />

                        <PlusButton disabled={isSubmitting} />
                    </Stack>
                </Flex>
            </form>
        </Card>
    );
};

export default ToDoCreate;
