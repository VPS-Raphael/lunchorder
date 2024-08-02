import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../Config';
import axios from 'axios';

export default function Admin() {
  const [providerName, setProviderName] = useState('');
  const [providerImage, setProviderImage] = useState('');

  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState({});
  const [dishProviderName, setDishProviderName] = useState('');
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishImage, setDishImage] = useState('');
  const [dishTagName, setDishTagName] = useState('');

  const [tagName, setTagName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/provider/all`, {});
        setProviders(response.data);

        if (response.data.length >= 1) setProvider(response.data[0]);
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    };
    fetchData();
  }, []);

  const handleProviderNameChange = (e) => {
    setProviderName(e.target.value);
  };

  const handleProviderImageChange = (e) => {
    setProviderImage(e.target.value);
  };

  const handleDishNameChange = (e) => {
    setDishName(e.target.value);
  };

  const handleDishDescriptionChange = (e) => {
    setDishDescription(e.target.value);
  };

  const handleDishImageChange = (e) => {
    setDishImage(e.target.value);
  };

  const handleDishPriceChange = (e) => {
    setDishPrice(e.target.value);
  };

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleDishTagNameChange = (e) => {
    setDishTagName(e.target.value);
  };

  const handleDishProviderNameChange = (e) => {
    setProvider(providers.find((provider) => provider.name === e.target.value));
    setDishProviderName(e.target.value);
    console.log(providers.find((provider) => provider.name === e.target.value));
  };

  const handleCreateProvider = async () => {
    const providerData = {
      name: providerName,
      image: providerImage,
    };

    try {
      await axios.post(`${SERVER_URL}/provider/create`, {
        providerData,
      });
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  const handleCreateDish = async () => {
    const dishData = {
      provider: provider,
      name: dishName,
      price: dishPrice,
      description: dishDescription,
      image: dishImage,
      tagName: dishTagName,
    };

    try {
      await axios.post(`${SERVER_URL}/dish/create`, {
        dishData,
      });
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  const handleCreateTag = async () => {
    try {
      await axios.post(`${SERVER_URL}/tag/create`, {
        tagName,
      });
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  return (
    <div className='main-container'>
      <h1>Admin (WIP)</h1>
      <div>
        <label>Name</label>
        <input
          type='text'
          value={providerName}
          onChange={handleProviderNameChange}
        />
        <label>Image</label>
        <input
          type='text'
          value={providerImage}
          onChange={handleProviderImageChange}
        />
        <button onClick={handleCreateProvider}>Create</button>
      </div>
      <div>
        <label>Providername</label>
        <input
          type='text'
          value={dishProviderName}
          onChange={handleDishProviderNameChange}
        />
        <label>Name</label>
        <input type='text' value={dishName} onChange={handleDishNameChange} />
        <label>Price</label>
        <input type='text' value={dishPrice} onChange={handleDishPriceChange} />
        <label>Description</label>
        <input
          type='text'
          value={dishDescription}
          onChange={handleDishDescriptionChange}
        />
        <label>Image</label>
        <input type='text' value={dishImage} onChange={handleDishImageChange} />
        <label>Tagname</label>
        <input
          type='text'
          value={dishTagName}
          onChange={handleDishTagNameChange}
        />
        {provider ? <button onClick={handleCreateDish}>Create</button> : <></>}
      </div>
      <div>
        <label>Tagname</label>
        <input type='text' value={tagName} onChange={handleTagNameChange} />
        <button onClick={handleCreateTag}>Create</button>
      </div>
    </div>
  );
}
