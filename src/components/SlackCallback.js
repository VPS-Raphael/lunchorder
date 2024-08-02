import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';
import { SERVER_URL } from '../Config';

const SlackCallback = () => {
  const location = useLocation();
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const fetchSlackToken = async () => {
      const code = new URLSearchParams(location.search).get('code');

      const response = await axios.get(
        `${SERVER_URL}/slack/callback?code=${code}`
      );
      const { userData } = response.data;
      setUserData(userData);
    };

    fetchSlackToken();
  }, [location.search, setUserData]);

  return (
    <div className='main-container'>
      {userData ? (
        <Navigate to='/'></Navigate>
      ) : (
        <div>
          <p>Slack authentication in progress...</p>
        </div>
      )}
    </div>
  );
};

export default SlackCallback;
