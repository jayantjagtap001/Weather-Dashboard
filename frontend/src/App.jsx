import React, { useState } from 'react';
import { fetchWeatherData } from './services/weatherService';
import SearchCity from './components/SearchCity';
import WeatherDisplay from './components/WeatherDisplay';
import FavoriteCities from './components/FavoriteCities';
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  const handleSearch = async (city) => {
    try {
      const data = await fetchWeatherData(city, unit);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchCity onSearch={handleSearch} />
      <WeatherDisplay weatherData={weatherData} unit={unit} />
      <FavoriteCities
        favorites={favorites}
        setFavorites={setFavorites}
        fetchWeatherData={handleSearch}
      />
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
}

export default App;
