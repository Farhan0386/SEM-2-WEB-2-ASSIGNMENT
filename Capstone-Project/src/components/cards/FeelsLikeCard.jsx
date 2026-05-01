import { Thermometer } from 'lucide-react';

const FeelsLikeCard = ({ current }) => {
  if (!current) return null;
  const feels = Math.round(current.main.feels_like);
  const actual = Math.round(current.main.temp);
  const diff = feels - actual;
  let desc = 'Similar to the actual temperature.';
  let emoji = '✨';
  if (diff > 3) { desc = 'Humidity is making it feel warmer.'; emoji = '🥵'; }
  if (diff < -3) { desc = 'Wind is making it feel cooler.'; emoji = '🥶'; }

  return (
    <div className="glass glass-gradient p-6 animate-fade-up" style={{ animationDelay: '0.9s' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-fuchsia-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
          <Thermometer className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-white/80 uppercase tracking-wider">Feels Like</h3>
      </div>
      <p className="text-4xl font-extrabold text-fuchsia-500 dark:text-fuchsia-400 mb-2">{feels}°</p>
      <p className="text-xs text-slate-400 dark:text-white/40">{emoji} {desc}</p>
    </div>
  );
};

export default FeelsLikeCard;
