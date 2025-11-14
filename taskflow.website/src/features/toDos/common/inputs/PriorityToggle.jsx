import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';
import { useState } from 'react';

const PriorityToggle = ({ isPriority, onToggle, disabled = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            aria-label={isPriority ? 'Remove priority' : 'Mark as priority'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                'transition-colors',
                isPriority
                    ? 'text-orange-400 hover:text-orange-300'
                    : 'text-slate-500 hover:text-slate-400',
                disabled && 'opacity-50 cursor-not-allowed'
            )}
        >
            {isPriority || isHovered ? (
                <StarIcon className="w-5 h-5" />
            ) : (
                <StarIconOutline className="w-5 h-5" />
            )}
        </button>
    );
};

export default PriorityToggle;
