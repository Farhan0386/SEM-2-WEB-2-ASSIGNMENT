import { Eye } from 'lucide-react';

const VisibilityCard = ({ current }) => {
  if (!current) return null;
  const visKm = (current.visibility / 1000).toFixed(1);
  const pct = Math.min((current.visibility / 10000) * 100, 100);
  let label = 'Crystal Clear';
  let emoji = '🌅';
  if (visKm < 1) { label = 'Very Poor'; emoji = '🌫️'; }
  else if (visKm < 4) { label = 'Poor'; emoji = '😶‍🌫️'; }
  else if (visKm < 10) { label = 'Moderate'; emoji = '🌤️'; }

  return (
    <div className="glass glass-gradient p-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Eye className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">Visibility</h3>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-extrabold text-violet-500 dark:text-violet-400">{visKm}</span>
        <span className="text-sm font-medium text-slate-400 dark:text-white/40">km</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-white/[0.06] rounded-full mt-3 mb-2.5 overflow-hidden">
        <div className="h-full rounded-full bg-violet-500 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-400 dark:text-white/40">{emoji} {label}</p>
    </div>
  );
};

export default VisibilityCard;
