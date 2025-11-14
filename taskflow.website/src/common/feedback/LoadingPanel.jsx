import Flex from '@common/layout/Flex';


const LoadingPanel = ({
    loading,
    size = 'md',
    height = 'h-32',
    children
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-4',
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" className={height}>
                <div
                    className={`${sizeClasses[size]} border-[var(--color-spinner-border)] border-t-[var(--color-spinner-accent)] rounded-full animate-spin`}
                />
            </Flex>
        );
    }

    return <>{children}</>;
};

export default LoadingPanel;
