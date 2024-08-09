import axios from 'axios'; // Assuming config.js is in the same directory
import { apiKey } from '../config';

export const fetchWeatherData = async (city, unit = 'metric') => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: city,
        appid: apiKey,
        units: unit,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data.message);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};
