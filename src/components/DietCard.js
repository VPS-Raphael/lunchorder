import React from 'react';
import '../styles/cards.css';

export default function DietCard({ toggleDiet, dietTag, id }) {
  const handleFilterClick = () => {
    toggleDiet(dietTag);
  };

  return (
    <div className='diet-card-container'>
      <input
        type='checkbox'
        className='checkbox'
        id={id}
        onClick={handleFilterClick}
      />
      <label htmlFor={id} className='switch'>
        {dietTag}
      </label>
    </div>
  );
}
