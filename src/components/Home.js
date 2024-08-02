import React from 'react';
import ProviderGrid from './ProviderGrid';

export default function Home() {
  const currentDate = new Date();

  const formatDate = (date) => {
    const days = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ];

    const dayName = days[date.getDay()].toUpperCase();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${dayName} ${day}/${month}`;
  };

  return (
    <div className='main-container'>
      <div className='title-container'>
        <h1>LUNCH | {formatDate(currentDate)}</h1>
        <h2>ANBIETER</h2>
        <hr />
      </div>
      <ProviderGrid></ProviderGrid>
    </div>
  );
}
