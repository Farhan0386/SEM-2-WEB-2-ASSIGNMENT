import { useMemo } from 'react';
import { format } from 'date-fns';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-bold text-white shadow-lg">
        {payload[0].value}°C
      </div>
    );
  }
  return null;
};

const HourlyCard = ({ forecast }) => {
  const hourlyData = useMemo(() => {
    if (!forecast?.list) return [];
    return forecast.list.slice(0, 8).map(item => ({
      time: format(new Date(item.dt * 1000), 'h a'),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      pop: Math.round(item.pop * 100),
    }));
  }, [forecast]);

  if (!hourlyData.length) return null;

  return (
    <div className="glass glass-gradient p-6 animate-fade-up col-span-full" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Hourly Forecast</h3>
      </div>

      <div className="flex justify-between items-end px-1 mb-1 overflow-x-auto hide-scrollbar gap-1">
        {hourlyData.map((h, i) => (
          <div key={i} className="flex flex-col items-center min-w-[64px] group">
            <span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors mb-1">{h.time}</span>
            <img src={`https://openweathermap.org/img/wn/${h.icon}.png`} alt="" className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(129,140,248,0.3)] group-hover:scale-110 transition-transform" />
            <span className="text-base font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">{h.temp}°</span>
          </div>
        ))}
      </div>

      {/* Area chart */}
      <div className="h-20 w-full mt-3 -mb-2 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <AreaChart data={hourlyData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="hourlyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="hourlyLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area type="natural" dataKey="temp" stroke="url(#hourlyLineGrad)" strokeWidth={2.5} fill="url(#hourlyAreaGrad)" dot={{ r: 3, fill: '#c084fc', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#e879f9', strokeWidth: 2, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-1 px-1">
        {hourlyData.map((h, i) => (
          <div key={i} className="flex items-center min-w-[64px] justify-center">
            <span className="text-[10px] text-sky-400/60">💧 {h.pop}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyCard;
