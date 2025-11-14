import { SparklesIcon } from '@heroicons/react/24/solid';
import Flex from '../layout/Flex';
import Stack from '../layout/Stack';

const PageHeader = () => {
    return (
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-lg">
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4">
       <Flex responsive align="center" justify="center" gap="3">
     <Stack spacing="2" align="center">
    <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-priority)]" />
   <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">TaskFlow</h1>
     </Stack>
      <div className="hidden sm:block h-6 w-px bg-[var(--color-border)]" />
      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] text-center">Get things done, one task at a time</p>
    </Flex>
  </div>
   </header>
    );
};

export default PageHeader;
