import { cn } from '@utils/cn';

/**
 * Divider pour séparer des sections de contenu
 * Crée une ligne de séparation horizontale
 * 
 * @param {string} className - Classes additionnelles
 */
const Divider = ({ className }) => {
    return (
        <div className={cn('border-b border-slate-700/50', className)} />
    );
};

export default Divider;
