import { useMemo } from 'react';
import { useToDos } from '../../../hooks/useToDos';
import { useFilters } from '../../../hooks/useFilters';
import { STATUS_FILTERS, PRIORITY_FILTERS, SORT_OPTIONS } from '../../../utils/constants';
import Stack from '../../../common/layout/Stack';
import ToDoItem from './components/ToDoItem';
import EmptyState from './components/EmptyState';

const ToDoList = () => {
    const { toDos } = useToDos();
    const { statusFilter, priorityFilter, sortBy } = useFilters();

    const filteredAndSortedToDos = useMemo(() => {
        if (!Array.isArray(toDos)) return [];

        let filtered = [...toDos];

        // Filter by status
        if (statusFilter === STATUS_FILTERS.ACTIVE) {
            filtered = filtered.filter((todo) => !todo.isCompleted);

        } else if (statusFilter === STATUS_FILTERS.COMPLETED) {
            filtered = filtered.filter((todo) => todo.isCompleted);
        }

        // Filter by priority
        if (priorityFilter === PRIORITY_FILTERS.PRIORITY) {
            filtered = filtered.filter((todo) => todo.isPriority);

        } else if (priorityFilter === PRIORITY_FILTERS.NON_PRIORITY) {
            filtered = filtered.filter((todo) => !todo.isPriority);
        }

        // Sort
        if (sortBy === SORT_OPTIONS.CREATED) {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        } else if (sortBy === SORT_OPTIONS.DUE_DATE) {
            filtered.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        }

        return filtered;
    }, [toDos, statusFilter, priorityFilter, sortBy]);

    if (!Array.isArray(toDos) || toDos.length === 0) {
        return <EmptyState />;
    }

    if (filteredAndSortedToDos.length === 0) {
        return (
            <Stack direction="vertical" align="center" spacing="4" className="py-12 text-slate-400">
                <p className="text-lg">No tasks match your filters</p>
            </Stack>
        );
    }

    return (
        <Stack direction="vertical" spacing="3" fullWidth>
            {filteredAndSortedToDos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} />
            ))}
        </Stack>
    );
};

export default ToDoList;
