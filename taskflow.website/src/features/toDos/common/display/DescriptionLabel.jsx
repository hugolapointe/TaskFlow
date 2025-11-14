import Label from '@common/display/Label';


const DescriptionLabel = ({ description, isCompleted = false }) => {
    return (
        <Label
            size="sm"
            weight="medium"
            color={isCompleted ? 'muted' : 'primary'}
            strikethrough={isCompleted}
            className="flex-1 min-w-0"
        >
            {description}
        </Label>
    );
};

export default DescriptionLabel;
