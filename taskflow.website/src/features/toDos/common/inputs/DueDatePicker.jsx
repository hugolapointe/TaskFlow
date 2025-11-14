import TextInput from '@common/inputs/TextInput';

const DueDatePicker = ({ value, onChange, onClick }) => {
    return (
        <TextInput
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onClick={onClick}
        />
    );
};

export default DueDatePicker;
