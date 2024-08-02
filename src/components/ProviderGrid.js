import React, { useEffect, useState } from 'react';
import ProviderCard from './ProviderCard';
import axios from 'axios';
import { SERVER_URL } from '../Config';

export default function ProviderGrid() {
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

  return (
    <div className='providers-container'>
      <ProviderCard
        provider={{
          id: 0,
          name: 'Alle Gerichte',
          image: 'all_dishes.png',
        }}></ProviderCard>
      {providers.map((provider) => (
        <ProviderCard provider={provider} key={provider.id}></ProviderCard>
      ))}
    </div>
  );
}
