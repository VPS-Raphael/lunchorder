import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';

export default function Logout() {
  const { userData } = useContext(UserDataContext);

  if (!userData) return <Navigate to='/'></Navigate>;

  /** TODO
   * Handle logout
   **/

  return (
    <div className='main-container'>
      <p>Logout process in progress...</p>
    </div>
  );
}
