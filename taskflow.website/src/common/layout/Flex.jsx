import { cn } from '../../utils/cn';

const Flex = ({ 
  responsive = false,
  align = 'center',
  justify = 'start',
  gap = '3',
  grow,
  shrink,
  className,
  children 
}) => {
  return (
    <div className={cn(
      'flex',
    responsive && 'flex-col sm:flex-row',
      responsive && align === 'center' && 'sm:items-center',
      !responsive && align === 'center' && 'items-center',
      !responsive && align === 'start' && 'items-start',
      !responsive && align === 'end' && 'items-end',
      justify === 'between' && 'justify-between',
  justify === 'end' && 'justify-end',
      justify === 'center' && 'justify-center',
      `gap-${gap}`,
      grow && 'flex-1',
      shrink && 'flex-shrink-0',
      grow && 'min-w-0',
      className
    )}>
      {children}
    </div>
  );
};

export default Flex;
