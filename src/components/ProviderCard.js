import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cards.css';

export default function ProviderCard({ provider }) {
  return (
    <Link to={`products/${provider.name}`}>
      <div className='provider-card-container'>
        <div className='image-container'>
          <img src={`images/${provider.image}`} alt={provider.name} />
        </div>
        <div className='text-container'>
          <h2>{provider.name}</h2>
        </div>
      </div>
    </Link>
  );
}
