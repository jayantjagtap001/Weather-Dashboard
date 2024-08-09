import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteCities = ({ favorites, setFavorites, fetchWeatherData }) => {
  const apiUrl = 'http://localhost:5000/favorites';
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const response = await axios.get(apiUrl);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorite cities:', error);
        setError('Error fetching favorite cities');
      }
    };

    getFavorites();
  }, [setFavorites]);

  const addFavorite = async (city) => {
    try {
      await axios.post(apiUrl, { city });
      setFavorites(prevFavorites => [...prevFavorites, { city }]);
    } catch (error) {
      console.error('Error adding favorite city:', error);
      setError('Error adding favorite city');
    }
  };

  const removeFavorite = async (city) => {
    try {
      await axios.delete(`${apiUrl}?city=${city}`);
      setFavorites(prevFavorites => prevFavorites.filter(f => f.city !== city));
    } catch (error) {
      console.error('Error removing favorite city:', error);
      setError('Error removing favorite city');
    }
  };

  return (
    <div className="favorite-cities">
      {error && <p className="error">{error}</p>}
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            {fav.city}
            <button onClick={() => fetchWeatherData(fav.city)}>Show Weather</button>
            <button onClick={() => removeFavorite(fav.city)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addFavorite(city)}>Add Current City to Favorites</button>
    </div>
  );
};

export default FavoriteCities;
