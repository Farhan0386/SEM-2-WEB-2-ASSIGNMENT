import { Wind as WindIcon } from 'lucide-react';

const WindCard = ({ current }) => {
  if (!current) return null;
  const speed = current.wind.speed;
  const deg = current.wind.deg || 0;
  const gust = current.wind.gust;

  const getDirection = (d) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW'];
    return dirs[Math.round(d / 45) % 8];
  };

  return (
    <div className="glass glass-gradient p-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <WindIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">Wind</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="44" fill="none" style={{ stroke: 'var(--svg-track)' }} strokeWidth="2" />
            <circle cx="50" cy="50" r="32" fill="none" style={{ stroke: 'var(--svg-track-sm)' }} strokeWidth="1" />
            {['N','E','S','W'].map((d, i) => {
              const angle = i * 90 - 90;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 38 * Math.cos(rad);
              const y = 50 + 38 * Math.sin(rad);
              return <text key={d} x={x} y={y + 1} fill="currentColor" className="text-slate-400 dark:text-white/35" fontSize="7" fontWeight="600" textAnchor="middle" dominantBaseline="middle">{d}</text>;
            })}
            <line x1="50" y1="50" x2={50 + 26 * Math.sin((deg * Math.PI) / 180)} y2={50 - 26 * Math.cos((deg * Math.PI) / 180)} stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" fill="#38bdf8" />
            <circle cx="50" cy="50" r="2" fill="#fff" />
          </svg>
        </div>
        <div className="text-right">
          <p className="text-3xl font-extrabold text-cyan-500 dark:text-cyan-400">{speed}</p>
          <p className="text-sm text-slate-500 dark:text-white/50 font-medium">m/s · {getDirection(deg)}</p>
          {gust && <p className="text-xs text-rose-400/70 mt-1.5">Gusts {gust} m/s</p>}
        </div>
      </div>
    </div>
  );
};

export default WindCard;
