import { cn } from '../../utils/cn';

const TextInput = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error,
    className,
    inputClassName,
    ...props
}) => {
    const input = (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={cn(
                'bg-[var(--color-input-bg)] text-[var(--color-input-text)] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-input-focus-ring)] focus:border-transparent',
                error ? 'border-[var(--color-danger)]' : 'border-[var(--color-input-border)]',
                type === 'date' && '[color-scheme:dark]',
                inputClassName
            )}
            {...props}
        />
    );

    if (!label && !error) {
        return input;
    }

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && (
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {label}
                    {required && <span className="text-[var(--color-icon-danger)] ml-1">*</span>}
                </label>
            )}
            {input}
            {error && <span className="text-sm text-[var(--color-icon-danger)]">{error}</span>}
        </div>
    );
};

export default TextInput;
