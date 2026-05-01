# SkyPulse ⛅

An advanced, premium weather dashboard built with React and Tailwind CSS. It features a beautiful, responsive dark glassmorphism design, real-time weather data, and comprehensive environmental metrics.

**[🚀 Live Demo (Click Here)](https://skyplus.vercel.app/)**

---

## 🌟 Features

- **Premium UI/UX:** Stunning dark glassmorphism aesthetic with animated gradient backgrounds that adapt to current weather conditions.
- **Real-Time Data:** Fetches up-to-the-minute weather data via the OpenWeather API.
- **Detailed Forecasts:** 
  - Smooth area charts for 8-hour forecasts using `Recharts`.
  - 5-Day forecast with colorful, iOS-style temperature range bars.
- **Advanced Environmental Metrics (Bento Grid):**
  - **Air Quality Index (AQI):** Detailed breakdown of pollutants (PM2.5, PM10, O₃, etc.) with a color-coded gradient scale.
  - **Wind Dynamics:** Visual compass dial showing wind direction, speed, and gusts.
  - **Humidity & Visibility:** Circular SVG gauges and progress bars for quick reading.
  - **Pressure:** hPa readings with high/low pressure indicators.
  - **Sunrise & Sunset:** Animated SVG arc showing the real-time position of the sun.
  - **Feels Like:** Temperature context (wind chill vs. humidity).
- **Smart Search:** Expandable, debounced search bar for querying global cities without hitting API rate limits.
- **Auto-Refresh:** Automatically fetches the latest data every 10 minutes.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS (v4) with custom CSS animations
- **State Management:** Redux Toolkit
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Dates/Time:** date-fns
- **HTTP Client:** Axios

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Farhan0386/Agri-Tech.git
   cd Agri-Tech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root of the project directory and add your OpenWeather API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📦 Deployment (Vercel)

If deploying to Vercel, ensure your settings are configured correctly:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** Leave this empty (since the project is now in the root).
- **Environment Variables:** Add `VITE_OPENWEATHER_API_KEY` in the Vercel dashboard.

---

*Made with ❤️ by Farhan Hussain*
