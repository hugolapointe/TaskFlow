import { cn } from '../../utils/cn';

/**
 * Composant Stack pour layout horizontal ou vertical
 *
 * @param {string} direction - 'horizontal' | 'vertical' (défaut: 'horizontal')
 * @param {string} spacing - Gap Tailwind ('2', '3', '4', etc.)
 * @param {string} align - 'start' | 'center' | 'end' | 'stretch' (défaut: 'center')
 * @param {boolean} fullWidth - Si true, les enfants prennent toute la largeur en mode vertical (défaut: true)
 * @param {string} className - Classes CSS additionnelles
 */
const Stack = ({
    direction = 'horizontal',
    spacing = '2',
    align = 'center',
    fullWidth = true,
    className,
    children
}) => {
    const isVertical = direction === 'vertical';

    return (
        <div className={cn(
            'flex',
            isVertical ? 'flex-col' : 'flex-row',
            `gap-${spacing}`,
            align === 'center' && 'items-center',
            align === 'start' && 'items-start',
            align === 'end' && 'items-end',
            align === 'stretch' && 'items-stretch',
            className
        )}>
          {isVertical && fullWidth ? (
         Array.isArray(children) 
        ? children.map((child, index) => (
         <div key={child?.key || index} className="w-full">
   {child}
             </div>
        ))
    : <div className="w-full">{children}</div>
            ) : children}
        </div>
    );
};

export default Stack;
