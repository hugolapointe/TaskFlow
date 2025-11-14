import { cn } from '../../utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    className,
    onClick,
    type = 'button',
    ...props
}) => {
    const baseClasses = 'font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
        primary: 'bg-[var(--color-button-primary)] hover:bg-[var(--color-button-primary-hover)] text-white',
        secondary: 'bg-[var(--color-button-secondary)] hover:bg-[var(--color-button-secondary-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
        danger: 'bg-[var(--color-button-danger)] hover:bg-[var(--color-button-danger-hover)] text-white',
        warning: 'bg-[var(--color-warning)] hover:bg-[var(--color-warning)] text-white',
        success: 'bg-[var(--color-button-success)] hover:bg-[var(--color-button-success-hover)] text-white',
    };

    return (
        <button
            type={type}
            className={cn(
                baseClasses,
                sizeClasses[size],
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
