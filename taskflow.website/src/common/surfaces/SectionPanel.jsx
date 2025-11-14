import { cn } from '@utils/cn';


const SectionPanel = ({ children, padding = 'md', minHeight, className }) => {
    const paddingMap = {
        none: '',
        sm: 'p-2 sm:p-3',
        md: 'p-4 sm:p-6',
        lg: 'p-6 sm:p-8',
        custom: '', // Pour px-X py-Y custom
    };

    return (
        <div className={cn(
            paddingMap[padding],
            minHeight,
            className
        )}>
            {children}
        </div>
    );
};

export default SectionPanel;
