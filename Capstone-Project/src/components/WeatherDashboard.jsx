import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MapPin } from 'lucide-react';
import { format } from 'date-fns';
import SearchBar from './SearchBar';
import HourlyCard from './cards/HourlyCard';
import FiveDayCard from './cards/FiveDayCard';
import AirQualityCard from './cards/AirQualityCard';
import WindCard from './cards/WindCard';
import HumidityCard from './cards/HumidityCard';
import VisibilityCard from './cards/VisibilityCard';
import PressureCard from './cards/PressureCard';
import SunCard from './cards/SunCard';
import FeelsLikeCard from './cards/FeelsLikeCard';

const bgGradients = {
  Clear: 'radial-gradient(ellipse at 20% 0%, #1e1b4b 0%, #0f0a2e 40%, #0b0e1a 100%)',
  Clouds: 'radial-gradient(ellipse at 30% 0%, #1e293b 0%, #0f172a 40%, #0b0e1a 100%)',
  Rain: 'radial-gradient(ellipse at 40% 0%, #0c1445 0%, #0a0e29 40%, #0b0e1a 100%)',
  Drizzle: 'radial-gradient(ellipse at 40% 0%, #0c1445 0%, #0a0e29 40%, #0b0e1a 100%)',
  Thunderstorm: 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0a0515 40%, #0b0e1a 100%)',
  Snow: 'radial-gradient(ellipse at 30% 0%, #1e293b 0%, #1e1e30 40%, #0b0e1a 100%)',
  Mist: 'radial-gradient(ellipse at 30% 0%, #1a1a2e 0%, #15152a 40%, #0b0e1a 100%)',
  default: 'radial-gradient(ellipse at 20% 0%, #1e1b4b 0%, #0f0a2e 40%, #0b0e1a 100%)',
};

const WeatherDashboard = () => {
  const { data, city, loading, error } = useSelector(s => s.weather);

  const bgGradient = useMemo(() => {
    if (!data?.current?.weather?.[0]) return bgGradients.default;
    return bgGradients[data.current.weather[0].main] || bgGradients.default;
  }, [data]);

  if (loading && !data) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: bgGradients.default }}>
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin" />
        </div>
        <p className="text-white/30 text-sm font-medium tracking-wide">Fetching weather for <span className="text-indigo-400">{city}</span>...</p>
      </div>
    );
  }

  // If there is no data and no error yet, show nothing (or a skeleton)
  // But if there IS an error, we should proceed to render the error banner.
  if (!data && !error) return null;

  const c = data?.current;
  const temp = c ? Math.round(c.main.temp) : null;
  const desc = c ? c.weather[0].description : null;
  const iconCode = c ? c.weather[0].icon : null;

  return (
    <div className="w-full min-h-screen relative" style={{ background: bgGradient }}>
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-600/[0.07] blur-[150px] -top-60 -left-40 animate-pulse-soft" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-fuchsia-600/[0.05] blur-[120px] top-1/3 right-[-200px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px] bottom-[-100px] left-1/4 animate-pulse-soft" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6">

        {/* ─── Watermark (Top) ─── */}
        <div className="text-center mb-4 animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Made by Farhan Hussain
          </p>
        </div>

        {/* ─── Top Bar ─── */}
        <header className="flex items-center justify-between mb-10 animate-fade-up" style={{ animationDelay: '0.02s' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{city}</h1>
              <p className="text-xs text-white/35 font-medium">{format(new Date(), 'EEEE, MMMM d · h:mm a')}</p>
            </div>
          </div>
          <SearchBar />
        </header>

        {/* ─── Error Banner ─── */}
        {error && (
          <div className="glass border-red-500/30 bg-red-500/[0.08] p-4 mb-8 text-center rounded-2xl animate-fade-up">
            <p className="text-red-300 text-sm font-semibold">⚠️ {error}</p>
            {!import.meta.env.VITE_OPENWEATHER_API_KEY && (
              <p className="text-red-400/60 text-xs mt-2">Hint: OpenWeather API key is missing. Check your environment variables.</p>
            )}
          </div>
        )}

        {data ? (
          <>
            {/* ─── Hero Section ─── */}
            <section className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 mb-12 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl scale-125" />
                <img
                  src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                  alt={desc}
                  className="relative w-40 h-40 md:w-52 md:h-52 drop-shadow-[0_0_40px_rgba(129,140,248,0.25)] animate-float"
                />
              </div>
              <div>
                <div className="flex items-start">
                  <span className="text-8xl md:text-[10rem] font-extralight tracking-tighter leading-none bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">{temp}</span>
                  <span className="text-3xl md:text-5xl font-light text-white/40 mt-2 md:mt-4">°C</span>
                </div>
                <p className="text-xl md:text-2xl capitalize font-semibold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mt-2">{desc}</p>
                <p className="text-sm text-white/35 mt-1.5 font-medium">
                  H: <span className="text-amber-400/80">{Math.round(c.main.temp_max)}°</span> · L: <span className="text-cyan-400/80">{Math.round(c.main.temp_min)}°</span> · Feels like <span className="text-purple-300/80">{Math.round(c.main.feels_like)}°</span>
                </p>
              </div>
            </section>

            {/* ─── Bento Grid ─── */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-10">
              <HourlyCard forecast={data.forecast} />

              <div className="lg:col-span-2">
                <FiveDayCard forecast={data.forecast} />
              </div>
              <div className="lg:col-span-2">
                <AirQualityCard pollution={data.pollution} />
              </div>

              <WindCard current={c} />
              <HumidityCard current={c} />
              <VisibilityCard current={c} />
              <PressureCard current={c} />

              <div className="lg:col-span-3">
                <SunCard current={c} />
              </div>
              <FeelsLikeCard current={c} />
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <p className="text-lg font-medium italic">No weather data to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;

