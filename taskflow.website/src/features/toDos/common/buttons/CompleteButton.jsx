import { CheckCircleIcon } from '@heroicons/react/24/outline';
import IconButton from '@common/buttons/IconButton';

const CompleteButton = ({ onClick, disabled = false }) => {
    return (
        <IconButton
            icon={<CheckCircleIcon className="w-5 h-5" />}
            label="Complete"
            variant="success"
            onClick={onClick}
            disabled={disabled}
        />
    );
};

export default CompleteButton;
