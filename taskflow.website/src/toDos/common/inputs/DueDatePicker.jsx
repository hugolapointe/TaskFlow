import TextInput from '../../../common/inputs/TextInput';

const DueDatePicker = ({ value, onChange, onClick }) => {
    return (
<TextInput
    type="date"
       value={value}
    onChange={onChange}
  onClick={onClick}
       inputClassName="flex-1 sm:w-44"
  />
    );
};

export default DueDatePicker;
