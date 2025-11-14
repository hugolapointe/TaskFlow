import { TrashIcon } from '@heroicons/react/24/outline';
import IconButton from '../../common/IconButton';

const ArchiveButton = ({ onClick, disabled = false }) => {
  return (
    <IconButton
      icon={<TrashIcon className="w-5 h-5" />}
      label="Archive"
      variant="danger"
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default ArchiveButton;
