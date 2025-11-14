import { cn } from '../../utils/cn';

const Stack = ({ 
  direction = 'horizontal',
  spacing = '2',
  align = 'center',
  className,
  children 
}) => {
  return (
    <div className={cn(
      'flex',
      direction === 'vertical' ? 'flex-col' : 'flex-row',
  `gap-${spacing}`,
      align === 'center' && 'items-center',
    align === 'start' && 'items-start',
 align === 'end' && 'items-end',
      className
)}>
      {children}
    </div>
  );
};

export default Stack;
