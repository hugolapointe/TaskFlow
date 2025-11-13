import TextInput from '../../common/TextInput';

const DueDatePicker = ({ value, onChange, onClick, className = "" }) => {
  return (
    <TextInput
      type="date"
      value={value}
   onChange={onChange}
      onClick={onClick}
      inputClassName={className}
    />
  );
};

export default DueDatePicker;
