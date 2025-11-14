import { CheckIcon } from '@heroicons/react/24/outline';
import IconButton from '../../common/IconButton';

const CompleteButton = ({ onClick, disabled = false }) => {
    return (
        <IconButton
            icon={<CheckIcon className="w-5 h-5" />}
            label="Mark as completed"
            variant="success"
            onClick={onClick}
            disabled={disabled}
        />
    );
};

export default CompleteButton;
