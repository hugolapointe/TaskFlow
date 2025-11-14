import Stack from '@common/layout/Stack';
import Card from '@common/surfaces/Card';
import { cn } from '@utils/cn';

const StatsCard = ({ title, value, color, onClick, isActive }) => {
    const colorClasses = {
        blue: 'border-blue-500/30 hover:bg-blue-900/20',
        orange: 'border-orange-500/30 hover:bg-orange-900/20',
        slate: 'border-slate-500/30 hover:bg-slate-700/20',
        green: 'border-green-500/30 hover:bg-green-900/20',
    };

    const activeClasses = {
        blue: 'ring-2 ring-blue-500 bg-blue-900/30',
        orange: 'ring-2 ring-orange-500 bg-orange-900/30',
        slate: 'ring-2 ring-slate-500 bg-slate-700/30',
        green: 'ring-2 ring-green-500 bg-green-900/30',
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
                <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
                <p className="text-3xl sm:text-4xl font-bold text-slate-100">{value}</p>
            </Stack>
        </Card>
    );
};

export default StatsCard;
