import { Gauge } from 'lucide-react';

const PressureCard = ({ current }) => {
  if (!current) return null;
  const pressure = current.main.pressure;
  const pct = Math.min(Math.max(((pressure - 950) / 100) * 100, 0), 100);
  const isHigh = pressure >= 1013;

  return (
    <div className="glass glass-gradient p-6 animate-fade-up" style={{ animationDelay: '0.7s' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
          <Gauge className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Pressure</h3>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">{pressure}</span>
        <span className="text-sm font-medium text-white/40">hPa</span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full mt-3 mb-2.5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #fb7185, #f59e0b)' }} />
      </div>
      <p className="text-xs text-white/40">{isHigh ? '📈 High' : '📉 Low'} pressure</p>
    </div>
  );
};

export default PressureCard;
