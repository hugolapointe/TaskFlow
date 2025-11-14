import { PencilIcon } from '@heroicons/react/24/outline';
import IconButton from '../../../common/buttons/IconButton';

const EditButton = ({ onClick, disabled = false }) => {
    return (
  <IconButton
icon={<PencilIcon className="w-5 h-5" />}
      label="Edit"
   variant="primary"
   onClick={onClick}
            disabled={disabled}
        />
 );
};

export default EditButton;
