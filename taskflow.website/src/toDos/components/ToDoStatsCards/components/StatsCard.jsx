/**
 * Composant StatsCard - Carte de statistique individuelle (fichier séparé)
 * Peut être réutilisé si nécessaire
 * 
 * Note: Ce composant est déjà inclus dans StatsGrid.jsx
 * Ce fichier sert de référence pour une éventuelle extraction future
 */

import Card from '../../../../common/Card';

const StatsCard = ({ title, value, icon, color, onClick }) => {
  const colorClasses = {
    blue: 'border-blue-500/30 hover:bg-blue-900/20',
    orange: 'border-orange-500/30 hover:bg-orange-900/20',
    slate: 'border-slate-500/30 hover:bg-slate-700/20',
    green: 'border-green-500/30 hover:bg-green-900/20',
  };

  return (
    <Card
      className={`${colorClasses[color]} cursor-pointer transition-all`}
      onClick={onClick}
    >
<div className="flex items-center justify-between">
   <div>
          <p className="text-sm text-slate-400">{title}</p>
    <p className="text-3xl font-bold text-slate-100 mt-1">{value}</p>
        </div>
     <div className="text-4xl">{icon}</div>
      </div>
    </Card>
  );
};

export default StatsCard;
