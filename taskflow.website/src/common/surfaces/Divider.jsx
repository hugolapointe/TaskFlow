import { cn } from '@utils/cn';


const Divider = ({ className }) => {
    return (
        <div className={cn('border-b border-[var(--color-divider)]', className)} />
    );
};

export default Divider;
