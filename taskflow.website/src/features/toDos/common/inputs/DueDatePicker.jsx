import TextInput from '@common/inputs/TextInput';

const DueDatePicker = ({ value, onChange, onClick }) => {
    return (
     <div className="sm:w-44">
  <TextInput
             type="date"
         value={value}
   onChange={onChange}
    onClick={onClick}
     />
      </div>
    );
};

export default DueDatePicker;
