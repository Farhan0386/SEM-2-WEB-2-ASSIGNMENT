import { Activity } from 'lucide-react';

const AirQualityCard = ({ pollution }) => {
  if (!pollution?.list?.[0]) return null;
  const aqi = pollution.list[0].main.aqi;
  const c = pollution.list[0].components;

  const levels = [
    { label: 'Good', emoji: '😊', gradient: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30', text: 'Air quality is excellent.' },
    { label: 'Fair', emoji: '🙂', gradient: 'from-yellow-400 to-amber-500', glow: 'shadow-amber-500/30', text: 'Acceptable for most.' },
    { label: 'Moderate', emoji: '😐', gradient: 'from-orange-500 to-red-500', glow: 'shadow-orange-500/30', text: 'Sensitive groups beware.' },
    { label: 'Poor', emoji: '😷', gradient: 'from-red-500 to-rose-700', glow: 'shadow-red-500/30', text: 'Health effects possible.' },
    { label: 'Hazardous', emoji: '☠️', gradient: 'from-purple-600 to-violet-800', glow: 'shadow-purple-500/30', text: 'Emergency conditions.' },
  ];
  const info = levels[aqi - 1] || levels[0];

  const pollutants = [
    { name: 'PM2.5', val: c.pm2_5?.toFixed(1), color: 'text-rose-400' },
    { name: 'PM10', val: c.pm10?.toFixed(1), color: 'text-orange-400' },
    { name: 'O₃', val: c.o3?.toFixed(1), color: 'text-cyan-400' },
    { name: 'NO₂', val: c.no2?.toFixed(1), color: 'text-amber-400' },
    { name: 'SO₂', val: c.so2?.toFixed(1), color: 'text-purple-400' },
    { name: 'CO', val: (c.co / 1000)?.toFixed(2), color: 'text-emerald-400' },
  ];

  return (
    <div className="glass glass-gradient p-6 animate-fade-up h-full" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">Air Quality</h3>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-3xl shadow-lg ${info.glow}`}>
          {info.emoji}
        </div>
        <div>
          <p className="text-2xl font-extrabold">{info.label}</p>
          <p className="text-xs text-white/50 mt-0.5">{info.text}</p>
        </div>
      </div>

      {/* Colorful AQI gradient bar */}
      <div className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-orange-500 via-red-500 to-purple-600 mb-5 relative">
        <div
          className="absolute w-4 h-4 bg-white rounded-full -top-[3px] shadow-lg shadow-white/30 border-2 border-slate-900 transition-all duration-500"
          style={{ left: `calc(${(aqi / 5) * 100}% - 8px)` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {pollutants.map(p => (
          <div key={p.name} className="bg-white/[0.04] rounded-xl p-2.5 text-center hover:bg-white/[0.08] transition-colors group">
            <p className="text-[10px] text-white/35 mb-0.5">{p.name}</p>
            <p className={`text-sm font-bold ${p.color} group-hover:scale-110 transition-transform inline-block`}>{p.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirQualityCard;
