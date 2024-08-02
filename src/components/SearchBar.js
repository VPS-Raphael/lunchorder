import React, { useState } from 'react';

export default function SearchBar({ className, onChange }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      className={className}
      type='text'
      placeholder='Suche nach Gerichten...'
      value={query}
      onChange={handleSearchChange}
    />
  );
}
