import { useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

const FiveDayCard = ({ forecast }) => {
  const dailyData = useMemo(() => {
    if (!forecast?.list) return [];
    const days = {};
    forecast.list.forEach(item => {
      const day = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
      const hour = new Date(item.dt * 1000).getHours();
      if (!days[day] || Math.abs(hour - 12) < Math.abs(new Date(days[day].dt * 1000).getHours() - 12)) {
        days[day] = item;
      }
    });
    return Object.values(days).slice(0, 5);
  }, [forecast]);

  if (!dailyData.length) return null;

  const allTemps = dailyData.flatMap(d => [d.main.temp_min, d.main.temp_max]);
  const overallMin = Math.min(...allTemps);
  const overallMax = Math.max(...allTemps);
  const range = overallMax - overallMin || 1;

  return (
    <div className="glass glass-gradient p-6 animate-fade-up h-full" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <CalendarDays className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">5-Day Forecast</h3>
      </div>
      <div className="flex flex-col gap-3.5">
        {dailyData.map((d, i) => {
          const low = Math.round(d.main.temp_min);
          const high = Math.round(d.main.temp_max);
          const leftPct = ((d.main.temp_min - overallMin) / range) * 100;
          const widthPct = ((d.main.temp_max - d.main.temp_min) / range) * 100;

          return (
            <div key={i} className="flex items-center gap-3 group">
              <span className="text-sm font-medium text-white/60 w-12 shrink-0 group-hover:text-white/90 transition-colors">
                {i === 0 ? 'Today' : format(new Date(d.dt * 1000), 'EEE')}
              </span>
              <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`} alt="" className="w-9 h-9 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-cyan-300/70 w-9 text-right shrink-0 font-medium">{low}°</span>
              <div className="flex-1 h-2 bg-white/[0.06] rounded-full relative mx-1 min-w-[60px]">
                <div
                  className="absolute h-full rounded-full shadow-sm"
                  style={{
                    left: `${leftPct}%`,
                    width: `${Math.max(widthPct, 10)}%`,
                    background: 'linear-gradient(90deg, #38bdf8, #818cf8, #e879f9, #fb923c)',
                  }}
                />
              </div>
              <span className="text-sm font-bold text-amber-300 w-9 shrink-0">{high}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDayCard;
