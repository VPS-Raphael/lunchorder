import React, { useContext, useEffect, useState } from 'react';
import DishGrid from './DishGrid';
import SearchBar from './SearchBar';
import DietsGrid from './DietsGrid';
import UserDataContext from '../context/UserDataContext';
import axios from 'axios';
import { SERVER_URL } from '../Config';

export default function FavoritesGrid() {
  const { userData } = useContext(UserDataContext);
  const [favorites, setFavorites] = useState([]);
  const [providers, setProviders] = useState([]);
  const [diets, setDiets] = useState([]);
  const [query, setQuery] = useState('');

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

    const fetchProviders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/provider/all`, {});
        setProviders(response.data);
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    };
    fetchProviders();

    fetchFavorites();
  }, [userData]);

  const toggleDiet = (diet) => {
    setDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((prev) => prev !== diet)
        : [...prev, diet]
    );
  };

  const matchesFilters = (dish) => {
    return diets.every((filter) => dish.tags.includes(filter));
  };

  const matchesSearch = (dish, query) => {
    return dish.name.toLowerCase().includes(query.toLowerCase());
  };

  const handleSearchChange = (value) => {
    setQuery(value);
  };

  const filteredFavorites = favorites.filter(
    (dish) => matchesSearch(dish, query) && matchesFilters(dish)
  );

  return (
    <div className='main-container'>
      <div className='title-container'>
        <h1>MEINE FAVORITEN</h1>
        <hr />
        <SearchBar
          className='search-bar'
          value={query}
          onChange={handleSearchChange}></SearchBar>
        <DietsGrid toggleDiet={toggleDiet}></DietsGrid>
      </div>
      <div>
        {}
        <DishGrid providers={providers} dishes={filteredFavorites}></DishGrid>
      </div>
    </div>
  );
}
