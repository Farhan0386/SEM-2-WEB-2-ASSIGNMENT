import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  const currentRes = await axios.get(`${BASE}/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' }
  });

  const { lat, lon } = currentRes.data.coord;

  const [forecastRes, pollutionRes] = await Promise.all([
    axios.get(`${BASE}/forecast`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' }
    }),
    axios.get(`${BASE}/air_pollution`, {
      params: { lat, lon, appid: API_KEY }
    }),
  ]);

  return {
    current: currentRes.data,
    forecast: forecastRes.data,
    pollution: pollutionRes.data,
  };
};
