import Label from '@common/display/Label';
import { formatDate, isOverdue } from '@utils/date';


const DueDateLabel = ({ dueDate, isCompleted = false }) => {
    if (!dueDate) return null;

    const isTaskOverdue = isOverdue(dueDate) && !isCompleted;

    return (
        <Label
            size="xs"
            weight={isTaskOverdue ? 'medium' : 'normal'}
            color={isTaskOverdue ? 'danger' : 'secondary'}
            className="sm:w-44 sm:text-right"
        >
            {formatDate(dueDate)}
        </Label>
    );
};

export default DueDateLabel;
