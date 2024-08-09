import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';

const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData(city, unit);
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    if (city) {
      getWeather();
    }
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="weather-display">
      {weather ? (
        <div>
          <h2>{weather.city.name}</h2>
          <p>Temperature: {weather.list[0].main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
          <button onClick={toggleUnit}>
            Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
