import { cn } from '../../../utils/cn';


const DescriptionLabel = ({ description, isCompleted = false }) => {
    return (
        <p className={cn(
            'text-sm sm:text-base font-medium flex-1 min-w-0',
            'text-slate-100',
            isCompleted && 'line-through text-slate-500'
        )}>
            {description}
        </p>
    );
};

export default DescriptionLabel;
