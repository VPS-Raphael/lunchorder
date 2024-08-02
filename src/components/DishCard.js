import React, { useContext, useEffect, useState } from 'react';
import UserDataContext from '../context/UserDataContext';
import { SERVER_URL } from '../Config';
import axios from 'axios';
import '../styles/cards.css';

export default function DishCard({ dishId, openModal }) {
  const { userData } = useContext(UserDataContext);
  const [favorites, setFavorites] = useState([]);
  const [dish, setDish] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/user/getfavorites`, {
          userData,
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    };

    const getDish = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/dish/get/${dishId}`,
          {}
        );
        setDish(response.data);
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    };

    getDish();
    fetchFavorites();
  }, [userData, dishId]);

  const toggleFavorite = (favorite) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === favorite.id)
        ? prev.filter((fav) => fav.id !== favorite.id)
        : [...prev, favorite]
    );
  };

  const handleToggleFavorite = async () => {
    const data = {
      slackId: userData.slackId,
      dishId: dish.id,
    };

    try {
      await axios.post(`${SERVER_URL}/user/togglefavorite`, {
        data,
      });
      toggleFavorite(dish);
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  const isFavorite = favorites.some((fav) => fav.id === dish.id);
  const className = isFavorite ? 'unfavorite' : 'favorite';

  let availableAt = '';

  if (dish.from && dish.to) {
    if (dish.from === dish.to) availableAt = `Verfügbar am ${dish.from}`;
    else availableAt = `Verfügbar von ${dish.from} bis ${dish.to}`;
  }

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/not-found.jpg';
  };

  return (
    <div className='dish-card-container' key={dish.dish_id}>
      <div className='favorite-container'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='-1 -1 26 26'
          width='50'
          height='50'
          className={className}
          onClick={handleToggleFavorite}>
          <path d='M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z' />
        </svg>
      </div>
      <div className='image-container'>
        <img
          src={`/images/${dish.image}`}
          alt={dish.name}
          onError={handleError}
        />
      </div>
      <div className='text-container'>
        <p id='date'>{availableAt}</p>
        <h2>{dish.name}</h2>
        <p>{dish.description}</p>
      </div>
      <div className='price-container' onClick={() => openModal(dish)}>
        <p>€ {dish.price}</p>
      </div>
    </div>
  );
}
