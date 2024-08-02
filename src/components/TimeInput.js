import React, { useState, useEffect } from 'react';

export default function TimeInput({ expiryTime, setExpiryTime }) {
  const [minTime, setMinTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setMinTime(`${hours}:${minutes}`);
    setExpiryTime(`${hours}:${minutes}`);
  }, [setExpiryTime]);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (value >= minTime && value <= '23:59') {
      setExpiryTime(value);
    } else {
      setExpiryTime(value < minTime ? minTime : '23:59');
    }
  };

  return (
    <div>
      <input
        id='timeInput'
        type='time'
        value={expiryTime}
        onChange={handleTimeChange}
        min={minTime}
      />
    </div>
  );
}
