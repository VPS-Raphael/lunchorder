import React, { useEffect, useState } from 'react';

export default function UserProfile({ token }) {
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:3001/profile?token=${token}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setProfilePic(data.profilePic);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          setError(error);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error.message}</div>;
  }

  return (
    <div>
      {profilePic ? (
        <img src={profilePic} alt='User Profile' width='40' />
      ) : (
        'No profile picture available'
      )}
    </div>
  );
}
