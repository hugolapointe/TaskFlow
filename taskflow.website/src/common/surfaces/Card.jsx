import { cn } from '../../utils/cn';

const Card = ({ children, className, onClick }) => {
    return (
     <div
     className={cn(
    'bg-slate-800 border border-slate-700 rounded-lg p-3 sm:p-4 shadow-lg overflow-hidden',
   onClick && 'cursor-pointer hover:bg-slate-750 transition-colors',
     className
    )}
  onClick={onClick}
    >
     {children}
  </div>
);
};

export default Card;
