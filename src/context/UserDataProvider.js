import React, { useState } from 'react';
import UserDataContext from './UserDataContext';

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
