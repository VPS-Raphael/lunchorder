import React from 'react';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='content-container'>
        <div className='left-container'>
          <h2>Impressum</h2>
          <p>Vivid Planet Software GmbH</p>
          <p>Hopfgartenstraße 10</p>
          <p>5302 Henndorf am Wallersee</p>
        </div>
        <div className='right-container'>
          <p>Telefon: +43 6214 20820</p>
          <p>
            <a href={'mailto:office@vivid-planet.com'}>
              office@vivid-planet.com
            </a>
          </p>
          <p>
            <a
              href='https://www.vivid-planet.com/'
              target='_blank'
              rel='noopener noreferrer'>
              www.vivid-planet.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
