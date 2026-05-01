import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '../services/api';

export const getWeatherData = createAsyncThunk(
  'weather/getWeatherData',
  async (city, { rejectWithValue }) => {
    try {
      return await fetchWeather(city);
    } catch (error) {
      if (error.response?.status === 404) return rejectWithValue('City not found. Check the spelling and try again.');
      if (error.response?.status === 429) return rejectWithValue('API limit reached. Please wait a moment.');
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null,
    city: 'London',
  },
  reducers: {
    setCity: (state, action) => { state.city = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getWeatherData.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(getWeatherData.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setCity, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
