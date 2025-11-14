import { PlusIcon } from '@heroicons/react/24/outline';
import IconButton from '../../../../common/buttons/IconButton';

const PlusButton = ({ disabled = false }) => {
    return (
        <IconButton
       icon={<PlusIcon className="w-5 h-5" />}
      label="Add Task"
 variant="primary"
   type="submit"
   disabled={disabled}
   />
    );
};

export default PlusButton;
