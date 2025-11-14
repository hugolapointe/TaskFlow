import { XMarkIcon } from '@heroicons/react/24/outline';
import IconButton from '../../common/IconButton';

const CancelButton = ({ onClick, disabled = false }) => {
    return (
        <IconButton
            icon={<XMarkIcon className="w-5 h-5" />}
            label="Cancel"
            variant="danger"
            onClick={onClick}
            disabled={disabled}
        />
    );
};

export default CancelButton;
