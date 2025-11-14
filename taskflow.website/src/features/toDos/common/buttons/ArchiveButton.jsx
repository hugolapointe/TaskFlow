import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import IconButton from '../../../../common/buttons/IconButton';

const ArchiveButton = ({ onClick, disabled = false }) => {
    return (
  <IconButton
    icon={<ArchiveBoxIcon className="w-5 h-5" />}
     label="Archive"
         variant="danger"
   onClick={onClick}
  disabled={disabled}
  />
    );
};

export default ArchiveButton;
