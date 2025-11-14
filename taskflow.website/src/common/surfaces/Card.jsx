import { cn } from '../../utils/cn';

const Card = ({ children, className, onClick }) => {
    return (
        <div
            className={cn(
                'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4 shadow-lg overflow-hidden',
                onClick && 'cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
