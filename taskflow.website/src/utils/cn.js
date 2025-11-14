export function cn(...classes) {
    return classes
        .flat()
        .filter((x) => typeof x === 'string' && x.length > 0)
        .join(' ')
        .trim();
}
