import { cn } from '@utils/cn';


const Label = ({
    children,
    size = 'base',
    weight = 'normal',
  color = 'primary',
    strikethrough = false,
    truncate = false,
className
}) => {
    const sizeMap = {
        xs: 'text-xs',
    sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
    };

    const weightMap = {
   normal: 'font-normal',
  medium: 'font-medium',
        semibold: 'font-semibold',
 bold: 'font-bold',
    };

    const colorMap = {
        primary: 'text-[var(--color-text-primary)]',
   secondary: 'text-[var(--color-text-muted)]',
        muted: 'text-[var(--color-button-secondary-hover)]',
        danger: 'text-[var(--color-icon-danger)]',
    };

    return (
        <span className={cn(
  sizeMap[size],
            weightMap[weight],
            colorMap[color],
   strikethrough && 'line-through',
            truncate && 'truncate',
      className
        )}>
         {children}
 </span>
    );
};

export default Label;
