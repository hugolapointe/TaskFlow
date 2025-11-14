import { cn } from '../../utils/cn';

/**
 * Composant Grid pour layout en grille
 * 
 * @param {number} cols - Nombre de colonnes par défaut (défaut: 1)
 * @param {number} smCols - Colonnes sur sm (optionnel)
 * @param {number} mdCols - Colonnes sur md (optionnel)
 * @param {number} lgCols - Colonnes sur lg (optionnel)
 * @param {string} gap - Gap Tailwind ('2', '3', '4', etc.) (défaut: '4')
 * @param {string} className - Classes CSS additionnelles
 */
const Grid = ({
  cols = 1,
    smCols,
    mdCols,
lgCols,
    gap = '4',
    className,
    children
}) => {
  return (
        <div className={cn(
          'grid',
   `grid-cols-${cols}`,
   smCols && `sm:grid-cols-${smCols}`,
            mdCols && `md:grid-cols-${mdCols}`,
   lgCols && `lg:grid-cols-${lgCols}`,
            `gap-${gap}`,
 className
        )}>
            {children}
        </div>
    );
};

export default Grid;
