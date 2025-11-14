import { cn } from '@utils/cn';


const Section = ({ children, variant = 'default', padding = 'md', className }) => {
    const variantClasses = {
        default: 'bg-slate-800/50 border border-slate-700',
        elevated: 'bg-slate-800 border border-slate-600 shadow-lg',
        outlined: 'bg-transparent border-2 border-slate-700',
    };

    const paddingMap = {
        none: '',
        sm: 'p-2 sm:p-3',
        md: 'p-4 sm:p-6',
        lg: 'p-6 sm:p-8',
    };

    return (
        <div className={cn(
            'rounded-lg overflow-hidden',
            variantClasses[variant],
            paddingMap[padding],
            className
        )}>
            {children}
        </div>
    );
};

export default Section;
