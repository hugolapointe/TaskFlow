import { cn } from '../utils/cn';

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
        primary: 'text-blue-400 hover:text-blue-300',
        danger: 'text-red-400 hover:text-red-300',
        success: 'text-green-400 hover:text-green-300',
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
