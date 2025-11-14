import Flex from '@common/layout/Flex';
import Spinner from './Spinner';


const LoadingWrapper = ({ loading, size = 'md', height = 'h-32', children }) => {
    if (loading) {
        return (
            <Flex justify="center" align="center" className={height}>
                <Spinner size={size} />
            </Flex>
        );
    }

    return <>{children}</>;
};

export default LoadingWrapper;
