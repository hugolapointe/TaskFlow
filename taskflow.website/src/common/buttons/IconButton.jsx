import { cn } from '../../utils/cn';

const IconButton = ({
    icon,
    label,
    variant = 'primary',
    disabled = false,
    className,
    onClick,
    ...props
}) => {
    const baseClasses = 'transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'text-[var(--color-icon-primary)] hover:text-[var(--color-icon-primary-hover)]',
        secondary: 'text-[var(--color-icon-secondary)] hover:text-[var(--color-icon-secondary-hover)]',
        danger: 'text-[var(--color-icon-danger)] hover:text-[var(--color-icon-danger-hover)]',
        success: 'text-[var(--color-icon-success)] hover:text-[var(--color-icon-success-hover)]',
    };

    return (
        <button
            type="button"
            aria-label={label}
            className={cn(baseClasses, variantClasses[variant], className)}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {icon}
        </button>
    );
};

export default IconButton;
