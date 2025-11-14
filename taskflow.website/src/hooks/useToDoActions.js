import { useAsyncAction } from './useAsyncAction';
import { useToDoState } from './useToDoState';
import { updateToDo, toggleToDoPriority, markToDoAsCompleted, archiveToDo } from '../api/toDosApi';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import {
    calculatePriorityDelta,
    calculateCompletionDelta,
    calculateArchiveDelta
} from '../utils/todoHelpers';

export const useToDoActions = (todo) => {
    const { execute, isLoading } = useAsyncAction();
    const { updateTodo, removeTodo, updateStats } = useToDoState();

    const handleUpdate = async (updates) => {
        return execute(
            async () => {
                const updatedToDo = await updateToDo(todo.id, updates);

                updateTodo(todo.id, updatedToDo);

                const statsDelta = calculatePriorityDelta(
                    todo.isPriority,
                    updatedToDo.isPriority
                );
                updateStats(statsDelta);

                return updatedToDo;
            },
            {
                successMessage: SUCCESS_MESSAGES.UPDATE,
                errorMessage: ERROR_MESSAGES.UPDATE
            }
        );
    };

    const handleTogglePriority = async () => {
        return execute(
            async () => {
                const updatedToDo = await toggleToDoPriority(todo.id);

                updateTodo(todo.id, updatedToDo);

                const statsDelta = calculatePriorityDelta(
                    todo.isPriority,
                    updatedToDo.isPriority
                );
                updateStats(statsDelta);

                return updatedToDo;
            },
            {
                successMessage: SUCCESS_MESSAGES.TOGGLE_PRIORITY,
                errorMessage: ERROR_MESSAGES.TOGGLE_PRIORITY,
                showLoading: false
            }
        );
    };

    const handleComplete = async () => {
        return execute(
            async () => {
                const updatedToDo = await markToDoAsCompleted(todo.id);

                updateTodo(todo.id, updatedToDo);

                const statsDelta = calculateCompletionDelta();
                updateStats(statsDelta);

                return updatedToDo;
            },
            {
                successMessage: SUCCESS_MESSAGES.COMPLETE,
                errorMessage: ERROR_MESSAGES.COMPLETE,
                showLoading: false
            }
        );
    };

    const handleArchive = async (shouldConfirm = true) => {
        if (shouldConfirm && !window.confirm('Are you sure you want to archive this task?')) {
            return { success: false, cancelled: true };
        }

        return execute(
            async () => {
                await archiveToDo(todo.id);

                removeTodo(todo.id);

                const statsDelta = calculateArchiveDelta(todo);
                updateStats(statsDelta);
            },
            {
                successMessage: SUCCESS_MESSAGES.ARCHIVE,
                errorMessage: ERROR_MESSAGES.ARCHIVE,
                showLoading: false
            }
        );
    };

    return {
        handleUpdate,
        handleTogglePriority,
        handleComplete,
        handleArchive,
        isLoading
    };
};
