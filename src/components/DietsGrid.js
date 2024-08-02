import React, { useEffect, useState } from 'react';
import DietCard from './DietCard';
import axios from 'axios';
import { SERVER_URL } from '../Config';

export default function DietsGrid({ toggleDiet }) {
  const [tags, setTags] = useState([]);
  if (!toggleDiet) toggleDiet = () => {};

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/tag/all`, {});
        setTags(response.data);
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    };
    fetchProviders();
  }, []);

  return (
    <div className='diets-container'>
      {tags.map((tag) => {
        return (
          <DietCard
            toggleDiet={toggleDiet}
            dietTag={tag.name}
            id={tag.id}
            key={tag.id}></DietCard>
        );
      })}
    </div>
  );
}
