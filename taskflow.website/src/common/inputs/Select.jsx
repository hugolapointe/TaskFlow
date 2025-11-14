import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

const Select = ({ label, value, onChange, options, className }) => {
    const selectElement = (
        <div className="relative w-full">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none bg-[var(--color-input-bg)] text-[var(--color-input-text)] border border-[var(--color-input-border)] rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-input-focus-ring)] focus:border-transparent cursor-pointer"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
        </div>
    );

    if (!label) {
        return selectElement;
    }

    return (
        <div className={cn('flex flex-col gap-1 w-full', className)}>
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                {label}
            </label>
            {selectElement}
        </div>
    );
};

export default Select;
