import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MapPin, Sun, Moon } from 'lucide-react';
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
import { useTheme } from '../context/ThemeContext';

const bgColorsDark = {
  Clear: '#0f0c29',
  Clouds: '#0f172a',
  Rain: '#0a0d24',
  Drizzle: '#0a0d24',
  Thunderstorm: '#150822',
  Snow: '#111c30',
  Mist: '#141426',
  default: '#0b0e1a',
};

const bgColorsLight = {
  Clear: '#dce4f7',
  Clouds: '#dde3ef',
  Rain: '#d4dff0',
  Drizzle: '#d4dff0',
  Thunderstorm: '#d8d0f0',
  Snow: '#e0e8f5',
  Mist: '#dde3ef',
  default: '#dde3ef',
};

const WeatherDashboard = () => {
  const { data, city, loading, error } = useSelector(s => s.weather);
  const { darkMode, toggleDarkMode } = useTheme();

  const bgColor = useMemo(() => {
    const palette = darkMode ? bgColorsDark : bgColorsLight;
    if (!data?.current?.weather?.[0]) return palette.default;
    return palette[data.current.weather[0].main] || palette.default;
  }, [data, darkMode]);

  if (loading && !data) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: darkMode ? bgColorsDark.default : bgColorsLight.default }}>
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-white/5" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin" />
        </div>
        <p className="text-slate-500 dark:text-white/30 text-sm font-medium tracking-wide">Fetching weather for <span className="text-indigo-600 dark:text-indigo-400">{city}</span>...</p>
      </div>
    );
  }

  if (!data && !error) return null;

  const c = data?.current;
  const temp = c ? Math.round(c.main.temp) : null;
  const desc = c ? c.weather[0].description : null;
  const iconCode = c ? c.weather[0].icon : null;

  return (
    <div className="w-full min-h-screen relative" style={{ background: bgColor }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6">

        {/* ─── Watermark (Top) ─── */}
        <div className="text-center mb-4 animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
            Made by Farhan Hussain
          </p>
        </div>

        {/* ─── Top Bar ─── */}
        <header className="flex items-center justify-between mb-10 animate-fade-up" style={{ animationDelay: '0.02s' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{city}</h1>
              <p className="text-xs text-slate-500 dark:text-white/35 font-medium">{format(new Date(), 'EEEE, MMMM d · h:mm a')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="glass w-10 h-10 flex items-center justify-center hover:border-indigo-400/40 transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <Sun className="w-5 h-5 text-amber-400" />
                : <Moon className="w-5 h-5 text-indigo-600" />
              }
            </button>
            <SearchBar />
          </div>
        </header>

        {/* ─── Error Banner ─── */}
        {error && (
          <div className="glass border-red-500/30 bg-red-500/[0.08] p-4 mb-8 text-center rounded-2xl animate-fade-up">
            <p className="text-red-600 dark:text-red-300 text-sm font-semibold">⚠️ {error}</p>
            {!import.meta.env.VITE_OPENWEATHER_API_KEY && (
              <p className="text-red-500/60 text-xs mt-2">Hint: OpenWeather API key is missing. Check your environment variables.</p>
            )}
          </div>
        )}

        {data ? (
          <>
            {/* ─── Hero Section ─── */}
            <section className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 mb-12 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl scale-125" />
                <img
                  src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                  alt={desc}
                  className="relative w-40 h-40 md:w-52 md:h-52 drop-shadow-[0_0_40px_rgba(129,140,248,0.25)] animate-float"
                />
              </div>
              <div>
                <div className="flex items-start">
                  <span className="text-8xl md:text-[10rem] font-extralight tracking-tighter leading-none text-slate-800 dark:text-white">{temp}</span>
                  <span className="text-3xl md:text-5xl font-light text-slate-400 dark:text-white/40 mt-2 md:mt-4">°C</span>
                </div>
                <p className="text-xl md:text-2xl capitalize font-semibold text-indigo-600 dark:text-indigo-300 mt-2">{desc}</p>
                <p className="text-sm text-slate-500 dark:text-white/35 mt-1.5 font-medium">
                  H: <span className="text-amber-500 dark:text-amber-400/80">{Math.round(c.main.temp_max)}°</span> · L: <span className="text-cyan-500 dark:text-cyan-400/80">{Math.round(c.main.temp_min)}°</span> · Feels like <span className="text-purple-600 dark:text-purple-300/80">{Math.round(c.main.feels_like)}°</span>
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

