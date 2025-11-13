import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useToDos } from '../../../hooks/useToDos';
import { createToDo } from '../../../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../../utils/constants';
import toast from 'react-hot-toast';
import Card from '../../../common/Card';
import PriorityToggle from '../../../common/PriorityToggle';
import DescriptionInput from '../../../common/DescriptionInput';
import DueDatePicker from '../../../common/DueDatePicker';


const ToDoCreate = () => {
    const { setToDos, loadStats } = useToDos();
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isPriority, setIsPriority] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            toast.error('Description is required');
            return;
        }

        setIsSubmitting(true);

        const newToDo = {
            description: description.trim(),
            dueDate: dueDate || null,
            isPriority,
        };

        try {
            // API call
            const createdToDo = await createToDo(newToDo);

            // Optimistic update
            setToDos((prev) => [createdToDo, ...prev]);
            await loadStats();

            // Reset form
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
                <div className="flex items-center gap-3">
                    <PriorityToggle
                        isPriority={isPriority}
                        onToggle={() => setIsPriority(!isPriority)}
                    />

                    <DescriptionInput
                        value={description}
                        onChange={setDescription}
                    />

                    <DueDatePicker
                        value={dueDate}
                        onChange={setDueDate}
                        className="w-44"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Create task"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default ToDoCreate;
