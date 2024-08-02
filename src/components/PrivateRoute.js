import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';

export default function PrivateRoute({ component }) {
  const { userData } = useContext(UserDataContext);
  return userData ? component : <Navigate to='/login' />;
}
