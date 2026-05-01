import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWeatherData } from '../store/weatherSlice';

export const useAutoRefresh = (city, intervalMinutes = 10) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial fetch handled by component
    const intervalId = setInterval(() => {
      if (city) {
        dispatch(getWeatherData(city));
      }
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [city, dispatch, intervalMinutes]);
};
