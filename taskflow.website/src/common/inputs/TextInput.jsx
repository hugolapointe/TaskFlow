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
                'bg-slate-800 text-slate-100 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
           error ? 'border-red-500' : 'border-slate-700',
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
     <label className="text-sm font-medium text-slate-300">
     {label}
      {required && <span className="text-red-400 ml-1">*</span>}
          </label>
            )}
            {input}
     {error && <span className="text-sm text-red-400">{error}</span>}
        </div>
    );
};

export default TextInput;
