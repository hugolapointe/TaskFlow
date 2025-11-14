import Label from '@common/display/Label';


const DescriptionLabel = ({ description, isCompleted = false }) => {
    return (
        <Label
          size="base"
            weight="medium"
            color={isCompleted ? 'muted' : 'primary'}
strikethrough={isCompleted}
            className="flex-1 min-w-0 py-2"
        >
   {description}
    </Label>
    );
};

export default DescriptionLabel;
