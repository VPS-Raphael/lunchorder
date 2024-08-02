import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import DishGrid from './DishGrid';
import DietsGrid from './DietsGrid';
import SearchBar from './SearchBar';
import axios from 'axios';
import { SERVER_URL } from '../Config';

export default function Products() {
  const { providerName } = useParams();
  const [diets, setDiets] = useState([]);
  const [query, setQuery] = useState('');
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/provider/all`, {});
        setProviders(response.data);
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    };
    fetchProviders();
  }, []);

  const toggleDiet = (diet) => {
    setDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((prev) => prev !== diet)
        : [...prev, diet]
    );
  };

  const allDishes = providers.flatMap((p) => p.dishes);
  let filteredDishes;

  if (providers.length === 0)
    return (
      <div className='title-container'>
        <h2>LOADING...</h2>
      </div>
    );

  const provider = providers.find(
    (provider) => provider.name.toLowerCase() === providerName.toLowerCase()
  );

  const matchesFilters = async (dish) => {
    // TODO: Check if dish contains selected tags (same in Favorites.js)
    return true;
  };

  const matchesSearch = (dish, query) => {
    return dish.name.toLowerCase().includes(query.toLowerCase());
  };

  const handleSearchChange = (value) => {
    setQuery(value);
  };

  let filteredProviders;
  if (!provider) {
    if (providerName !== 'Alle Gerichte') return <Navigate to='/' />;
    filteredDishes = allDishes.filter(
      (dish) => matchesFilters(dish) && matchesSearch(dish, query)
    );
    filteredProviders = providers;
  }

  if (provider) {
    filteredDishes = provider.dishes.filter(
      (dish) => matchesFilters(dish) && matchesSearch(dish, query)
    );
    filteredProviders = [provider];
  }

  return (
    <div className='main-container'>
      <div className='title-container'>
        <h2>{providerName.toUpperCase()}</h2>
        <hr />
        <SearchBar
          className='search-bar'
          value={query}
          onChange={handleSearchChange}></SearchBar>
        <DietsGrid toggleDiet={toggleDiet}></DietsGrid>
      </div>
      {providerName !== 'Alle Gerichte' ? (
        <DishGrid
          providers={filteredProviders}
          dishes={filteredDishes}></DishGrid>
      ) : (
        <DishGrid
          providers={filteredProviders}
          dishes={filteredDishes}></DishGrid>
      )}
    </div>
  );
}
