import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';

export default function Header() {
  const { userData } = useContext(UserDataContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='header'>
      <div className='logo-container'>
        <Link to='/'>
          <img src='/favicon.ico' alt='Logo' className='logo' />
        </Link>
        <div className='company-name'>
          <h1>VIVID PLANET</h1>
          <h2>SOFTWARE GMBH</h2>
        </div>
        <div className='project-name'>
          <h2>lunchorder</h2>
        </div>
      </div>
      <div className='icon-container'>
        <Link to='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='home'
            viewBox='0 0 24 24'
            className='icon'>
            <path d='M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h2c.553,0,1-.448,1-1V14c0-.551,.448-1,1-1h6c.552,0,1,.449,1,1v9c0,.552,.447,1,1,1h2c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Z' />
          </svg>
        </Link>
        <Link to='/favorites'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='favorites'
            viewBox='0 0 24 24'
            className='icon'>
            <path d='M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z' />
          </svg>
        </Link>
        <Link to='/orders'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='orders'
            viewBox='0 0 24 24'
            className='icon'>
            <path d='M9,22c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm8-2c-1.105,0-2,.895-2,2s.895,2,2,2,2-.895,2-2-.895-2-2-2Zm7-15c0,2.761-2.239,5-5,5s-5-2.239-5-5S16.239,0,19,0s5,2.239,5,5Zm-3,2h0c.39-.39,.39-1.024,0-1.414l-1-1v-1.586c0-.552-.448-1-1-1h0c-.552,0-1,.448-1,1v2c0,.265,.105,.52,.293,.707l1.293,1.293c.39,.39,1.024,.39,1.414,0Zm-2,5.115c-3.86,0-7-3.141-7-7,0-.737,.116-1.447,.329-2.115H5.242l-.041-.352c-.179-1.51-1.46-2.648-2.979-2.648H1C.447,0,0,.448,0,1s.447,1,1,1h1.222c.507,0,.934,.38,.993,.883l1.376,11.702c.297,2.517,2.432,4.416,4.966,4.416h9.443c.553,0,1-.448,1-1s-.447-1-1-1H9.557c-1.292,0-2.404-.826-2.82-2h11.424c2.375,0,4.437-1.69,4.902-4.019l.041-.207c-1.155,.84-2.57,1.341-4.104,1.341Z' />
          </svg>
        </Link>
        <div
          className='account-icon-container'
          onClick={toggleDropdown}
          ref={dropdownRef}>
          {userData ? (
            <img
              src={userData.profilePic}
              alt='user profile'
              id='account'
              className='icon'></img>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              id='account'
              viewBox='0 0 512 512'
              className='icon'>
              <g>
                <circle cx='256' cy='128' r='128' />
                <path d='M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z' />
              </g>
            </svg>
          )}
          {isDropdownOpen && (
            <div className='dropdown-menu'>
              {userData ? (
                <>
                  <Link to='/profile' className='dropdown-item'>
                    Profil
                  </Link>
                  <Link to='/settings' className='dropdown-item'>
                    Einstellungen
                  </Link>
                  <Link to='/admin' className='dropdown-item'>
                    Admin
                  </Link>
                  <Link to='/logout' className='dropdown-item'>
                    Abmelden
                  </Link>
                </>
              ) : (
                <Link to='/login' className='dropdown-item'>
                  Anmelden
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
