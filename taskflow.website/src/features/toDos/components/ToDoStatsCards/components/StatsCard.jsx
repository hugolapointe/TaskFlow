import Stack from '@common/layout/Stack';
import Card from '@common/surfaces/Card';
import { cn } from '@utils/cn';

const StatsCard = ({ title, value, color, onClick, isActive }) => {
    const colorClasses = {
        blue: 'border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/10',
        yellow: 'border-[var(--color-priority)]/30 hover:bg-[var(--color-priority)]/10',
        orange: 'border-orange-500/30 hover:bg-orange-900/20',
        slate: 'border-slate-500/30 hover:bg-slate-700/20',
        green: 'border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/10',
    };

    const activeClasses = {
        blue: 'ring-2 ring-[var(--color-primary)] bg-[var(--color-primary)]/20',
        yellow: 'ring-2 ring-[var(--color-priority)] bg-[var(--color-priority)]/20',
        orange: 'ring-2 ring-orange-500 bg-orange-900/30',
        slate: 'ring-2 ring-slate-500 bg-slate-700/30',
        green: 'ring-2 ring-[var(--color-success)] bg-[var(--color-success)]/20',
    };

    return (
        <Card
            className={cn(
                colorClasses[color],
                'cursor-pointer transition-all py-4 sm:py-6',
                isActive && activeClasses[color]
            )}
            onClick={onClick}
        >
            <Stack direction="vertical" align="center" spacing="2" className="text-center">
                <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{title}</p>
                <p className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">{value}</p>
            </Stack>
        </Card>
    );
};

export default StatsCard;
