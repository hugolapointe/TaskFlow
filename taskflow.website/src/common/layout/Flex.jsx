import { cn } from '../../utils/cn';

const Flex = ({
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    gap = '0',
  grow = false,
  shrink = false,
    responsive = false,
    className,
    children
}) => {
    const gapMap = {
        0: '',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
    6: 'gap-6',
   '2 sm:gap-3': 'gap-2 sm:gap-3',
    };

return (
        <div className={cn(
   'flex',
   direction === 'column' && 'flex-col',
   responsive && 'flex-col sm:flex-row',
         align === 'center' && 'items-center',
      align === 'start' && 'items-start',
   align === 'end' && 'items-end',
        align === 'stretch' && 'items-stretch',
 justify === 'start' && 'justify-start',
     justify === 'end' && 'justify-end',
  justify === 'center' && 'justify-center',
      justify === 'between' && 'justify-between',
         justify === 'around' && 'justify-around',
            gapMap[gap],
   grow && 'flex-1',
        shrink && 'flex-shrink-0',
         className
  )}>
            {children}
        </div>
    );
};

export default Flex;
