import { useToDos } from '../../../../hooks/useToDos';
import { useFilters } from '../../../../hooks/useFilters';
import { STATUS_FILTERS, PRIORITY_FILTERS, SORT_OPTIONS } from '../../../../utils/constants';
import Card from '../../../../common/Card';
import { cn } from '../../../../utils/cn';

const StatsCard = ({ title, value, color, onClick, isActive }) => {
  const colorClasses = {
    blue: 'border-blue-500/30 hover:bg-blue-900/20',
    orange: 'border-orange-500/30 hover:bg-orange-900/20',
    slate: 'border-slate-500/30 hover:bg-slate-700/20',
    green: 'border-green-500/30 hover:bg-green-900/20',
  };

  const activeClasses = {
    blue: 'ring-2 ring-blue-500 bg-blue-900/30',
    orange: 'ring-2 ring-orange-500 bg-orange-900/30',
    slate: 'ring-2 ring-slate-500 bg-slate-700/30',
    green: 'ring-2 ring-green-500 bg-green-900/30',
  };

  return (
    <Card
      className={cn(
        colorClasses[color],
        'cursor-pointer transition-all py-4 sm:py-6',
        isActive && activeClasses[color]
      )}
      onClick={onClick}
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">{title}</p>
        <p className="text-3xl sm:text-4xl font-bold text-slate-100">{value}</p>
      </div>
    </Card>
  );
};

const StatsGrid = () => {
  const { stats } = useToDos();
  const { statusFilter, priorityFilter, setStatusFilter, setPriorityFilter, setSortBy } = useFilters();

  const resetToDefault = () => {
    setStatusFilter(STATUS_FILTERS.ALL);
    setPriorityFilter(PRIORITY_FILTERS.ALL);
    setSortBy(SORT_OPTIONS.CREATED);
  };

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

  const remainingTasks = stats.total - stats.completed;

  const isRemainingActive = statusFilter === STATUS_FILTERS.ACTIVE && priorityFilter === PRIORITY_FILTERS.ALL;
  const isPriorityActive = statusFilter === STATUS_FILTERS.ACTIVE && priorityFilter === PRIORITY_FILTERS.PRIORITY;
  const isNonPriorityActive = statusFilter === STATUS_FILTERS.ACTIVE && priorityFilter === PRIORITY_FILTERS.NON_PRIORITY;
  const isCompletedActive = statusFilter === STATUS_FILTERS.COMPLETED;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
    </div>
  );
};

export default StatsGrid;
