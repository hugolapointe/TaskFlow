/**
 * Utilitaire pour combiner des classes CSS conditionnellement
 * Inspiré de la bibliothèque 'clsx' et 'tailwind-merge'
 * 
 * @param {...(string|Object|Array)} classes - Classes à combiner
 * @returns {string} Classes combinées
 * 
 * Exemples:
 * cn('class1', 'class2') => 'class1 class2'
 * cn('class1', condition && 'class2') => 'class1 class2' ou 'class1'
 * cn({ 'class1': true, 'class2': false }) => 'class1'
 */
export function cn(...classes) {
    return classes
        .flat()
        .filter((x) => typeof x === 'string' && x.length > 0)
        .join(' ')
        .trim();
}
