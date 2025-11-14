import TextInput from '../../common/TextInput';

const DescriptionInput = ({ value, onChange, placeholder = "What needs to be done?", onClick }) => {
    return (
        <TextInput
            type="text"
            value={value}
            onChange={onChange}
            onClick={onClick}
            placeholder={placeholder}
            inputClassName="flex-1"
        />
    );
};

export default DescriptionInput;
