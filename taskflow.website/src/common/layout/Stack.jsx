import { cn } from '../../utils/cn';


const Stack = ({
    direction = 'horizontal',
    spacing = '2',
    align = 'center',
    fullWidth = true,
    className,
    children
}) => {
    const isVertical = direction === 'vertical';

    const spacingMap = {
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        6: 'gap-6',
    };

    return (
        <div className={cn(
            'flex',
            isVertical ? 'flex-col' : 'flex-row',
            spacingMap[spacing],
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
