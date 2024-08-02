import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';
import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../Config';

export default function Login() {
  const { userData } = useContext(UserDataContext);

  if (userData) return <Navigate to='/'></Navigate>;
  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}/slack/callback`;

  window.location.href = slackAuthUrl;

  return (
    <div className='main-container'>
      <p>Loggin in...</p>
    </div>
  );
}
