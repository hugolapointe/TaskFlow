import { cn } from '@utils/cn';


const PageContainer = ({ children, spacing = '4', className }) => {
    const spacingMap = {
        2: 'space-y-2 sm:space-y-3',
        3: 'space-y-3 sm:space-y-4',
        4: 'space-y-4 sm:space-y-6',
        6: 'space-y-6 sm:space-y-8',
    };

    return (
        <div className={cn(spacingMap[spacing], className)}>
            {children}
        </div>
    );
};

export default PageContainer;
