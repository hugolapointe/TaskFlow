import { cn } from '../utils/cn';

const Card = ({ children, className, onClick }) => {
    const isClickable = !!onClick;

    return (
        <div
            className={cn(
                'bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg',
                isClickable && 'cursor-pointer hover:bg-slate-750 transition-colors',
                className
            )}
            onClick={onClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
        >
            {children}
        </div>
    );
};

export default Card;
