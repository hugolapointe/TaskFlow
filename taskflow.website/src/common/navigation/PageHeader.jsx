import { SparklesIcon } from '@heroicons/react/24/solid';
import Flex from '../layout/Flex';
import Stack from '../layout/Stack';

const PageHeader = () => {
    return (
        <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
            <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4">
                <Flex responsive align="center" justify="center" gap="2 sm:gap-4">
                    <Stack spacing="2" align="center">
                        <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-100">TaskFlow</h1>
                    </Stack>
                    <div className="hidden sm:block h-6 w-px bg-slate-600" />
                    <p className="text-xs sm:text-sm text-slate-400 text-center">Get things done, one task at a time</p>
                </Flex>
            </div>
        </header>
    );
};

export default PageHeader;
