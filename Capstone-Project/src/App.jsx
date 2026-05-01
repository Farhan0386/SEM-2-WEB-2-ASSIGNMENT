import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherData } from './store/weatherSlice';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  const dispatch = useDispatch();
  const { city } = useSelector(s => s.weather);

  useEffect(() => {
    if (city) dispatch(getWeatherData(city));
  }, [city, dispatch]);

  useAutoRefresh(city, 10);

  return <WeatherDashboard />;
}

export default App;
