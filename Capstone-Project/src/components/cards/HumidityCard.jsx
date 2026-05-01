import { Droplets } from 'lucide-react';

const HumidityCard = ({ current }) => {
  if (!current) return null;
  const humidity = current.main.humidity;
  const dewPoint = Math.round(current.main.temp - ((100 - humidity) / 5));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (humidity / 100) * circumference;

  return (
    <div className="glass glass-gradient p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Droplets className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">Humidity</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" style={{ stroke: 'var(--svg-track)' }} strokeWidth="7" />
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{humidity}%</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 dark:text-white/40 mb-1">Dew Point</p>
          <p className="text-2xl font-bold text-sky-500 dark:text-sky-300">{dewPoint}°</p>
          <p className="text-xs text-slate-400 dark:text-white/30 mt-1">{humidity > 70 ? 'Humid' : humidity > 40 ? 'Comfortable' : 'Dry'}</p>
        </div>
      </div>
    </div>
  );
};

export default HumidityCard;
