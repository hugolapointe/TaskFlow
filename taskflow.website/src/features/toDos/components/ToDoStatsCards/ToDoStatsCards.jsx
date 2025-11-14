import { useToDos } from '@hooks/useToDos';
import { useFilters } from '@hooks/useFilters';
import { STATUS_FILTERS, PRIORITY_FILTERS, SORT_OPTIONS } from '@utils/constants';
import Grid from '@common/layout/Grid';
import StatsCard from './components/StatsCard';

const ToDoStatsCards = () => {
    const { stats } = useToDos();
    const { statusFilter, priorityFilter, setStatusFilter, setPriorityFilter, setSortBy } = useFilters();

    const resetToDefault = () => {
        setStatusFilter(STATUS_FILTERS.ALL);
        setPriorityFilter(PRIORITY_FILTERS.ALL);
        setSortBy(SORT_OPTIONS.CREATED);
    };

    const remainingTasks = stats.total - stats.completed;

    const isRemainingActive = statusFilter === STATUS_FILTERS.ACTIVE && priorityFilter === PRIORITY_FILTERS.ALL;
    const isPriorityActive = statusFilter === STATUS_FILTERS.ACTIVE && priorityFilter === PRIORITY_FILTERS.PRIORITY;
    const isNonPriorityActive = statusFilter === STATUS_FILTERS.ACTIVE && priorityFilter === PRIORITY_FILTERS.NON_PRIORITY;
    const isCompletedActive = statusFilter === STATUS_FILTERS.COMPLETED;

    const handleRemainingClick = () => {
        if (isRemainingActive) {
            resetToDefault();

        } else {
            setStatusFilter(STATUS_FILTERS.ACTIVE);
            setPriorityFilter(PRIORITY_FILTERS.ALL);
        }
    };

    const handlePriorityClick = () => {
        if (isPriorityActive) {
            resetToDefault();

        } else {
            setStatusFilter(STATUS_FILTERS.ACTIVE);
            setPriorityFilter(PRIORITY_FILTERS.PRIORITY);
        }
    };

    const handleNonPriorityClick = () => {
        if (isNonPriorityActive) {
            resetToDefault();

        } else {
            setStatusFilter(STATUS_FILTERS.ACTIVE);
            setPriorityFilter(PRIORITY_FILTERS.NON_PRIORITY);
        }
    };

    const handleCompletedClick = () => {
        if (isCompletedActive) {
            resetToDefault();

        } else {
            setStatusFilter(STATUS_FILTERS.COMPLETED);
            setPriorityFilter(PRIORITY_FILTERS.ALL);
        }
    };

    return (
        <Grid cols={2} lgCols={4} gap="3">
            <StatsCard
                title="Remaining"
                value={remainingTasks}
                color="blue"
                onClick={handleRemainingClick}
                isActive={isRemainingActive}
            />
            <StatsCard
                title="Priority"
                value={stats.priority}
                color="orange"
                onClick={handlePriorityClick}
                isActive={isPriorityActive}
            />
            <StatsCard
                title="Regular"
                value={stats.nonPriority}
                color="slate"
                onClick={handleNonPriorityClick}
                isActive={isNonPriorityActive}
            />
            <StatsCard
                title="Completed"
                value={stats.completed}
                color="green"
                onClick={handleCompletedClick}
                isActive={isCompletedActive}
            />
        </Grid>
    );
};

export default ToDoStatsCards;
