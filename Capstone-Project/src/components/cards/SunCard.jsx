import { Sunrise, Sunset } from 'lucide-react';
import { format } from 'date-fns';

const SunCard = ({ current }) => {
  if (!current) return null;
  const sunrise = new Date(current.sys.sunrise * 1000);
  const sunset = new Date(current.sys.sunset * 1000);
  const now = new Date();
  const total = sunset - sunrise;
  const elapsed = now - sunrise;
  const progress = Math.max(0, Math.min(elapsed / total, 1));
  const R = 35, cx = 50, cy = 55;
  const sunAngle = Math.PI - progress * Math.PI;
  const sx = cx + R * Math.cos(sunAngle);
  const sy = cy - R * Math.sin(sunAngle);

  return (
    <div className="glass glass-gradient p-6 animate-fade-up" style={{ animationDelay: '0.8s' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Sunrise className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Sunrise & Sunset</h3>
      </div>
      <div className="relative w-full h-28">
        <svg viewBox="0 0 100 65" className="w-full h-full">
          <line x1="10" y1="55" x2="90" y2="55" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <path d={`M ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx+R} ${cy}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d={`M ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${sx} ${sy}`} fill="none" stroke="url(#sunArc)" strokeWidth="2.5" strokeLinecap="round" />
          {progress > 0 && progress < 1 && (
            <><circle cx={sx} cy={sy} r="8" fill="#fbbf24" opacity="0.15" /><circle cx={sx} cy={sy} r="4" fill="#fbbf24" /></>
          )}
          <defs><linearGradient id="sunArc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f97316" /></linearGradient></defs>
        </svg>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-sm"><Sunrise className="w-4 h-4 text-amber-400" /><span className="text-amber-300 font-medium">{format(sunrise, 'h:mm a')}</span></div>
        <div className="flex items-center gap-1.5 text-sm"><Sunset className="w-4 h-4 text-orange-400" /><span className="text-orange-300 font-medium">{format(sunset, 'h:mm a')}</span></div>
      </div>
    </div>
  );
};

export default SunCard;
