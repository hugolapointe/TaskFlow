import { CheckIcon } from '@heroicons/react/24/outline';
import IconButton from '../../../common/buttons/IconButton';

const SaveButton = ({ onClick, disabled = false }) => {
    return (
     <IconButton
    icon={<CheckIcon className="w-5 h-5" />}
      label="Save"
       variant="success"
    onClick={onClick}
        disabled={disabled}
        />
    );
};

export default SaveButton;
