import Label from '@common/display/Label';
import { formatDate, isOverdue } from '@utils/date';


const DueDateLabel = ({ dueDate, isCompleted = false }) => {
    if (!dueDate) return <div className="sm:w-44"></div>;

    const isTaskOverdue = isOverdue(dueDate) && !isCompleted;

    return (
        <Label
            size="base"
            weight={isTaskOverdue ? 'medium' : 'normal'}
            color={isTaskOverdue ? 'danger' : 'secondary'}
            className="sm:w-44 sm:text-right py-2"
        >
            {formatDate(dueDate)}
        </Label>
    );
};

export default DueDateLabel;
