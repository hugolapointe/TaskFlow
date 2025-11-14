import { cn } from '../../utils/cn';

const Grid = ({
    cols = 1,
    smCols,
    mdCols,
    lgCols,
    gap = '4',
    className,
    children
}) => {
    const colsMap = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    };

    const smColsMap = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
    };

    const mdColsMap = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    };

    const lgColsMap = {
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
    };

    const gapMap = {
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        6: 'gap-6',
    };

    return (
        <div className={cn(
            'grid',
            colsMap[cols],
            smCols && smColsMap[smCols],
            mdCols && mdColsMap[mdCols],
            lgCols && lgColsMap[lgCols],
            gapMap[gap],
            className
        )}>
            {children}
        </div>
    );
};

export default Grid;
