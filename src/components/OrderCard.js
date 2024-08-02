import React from 'react';
import '../styles/cards.css';

export default function OrderCard({ order, openDialog }) {
  const expiryDate = new Date(order.expiryDate);
  const hours = expiryDate.getHours().toString().padStart(2, '0');
  const minutes = expiryDate.getMinutes().toString().padStart(2, '0');
  const expireTime = `${hours}:${minutes} Uhr `;
  let total = 0;

  for (const participant of order.participants) {
    for (const userDish of participant.dishes.filter(
      (userDish) => userDish.dish.provider.name === order.provider.name
    )) {
      total += +userDish.dish.price;
    }
  }

  const handleOrderClick = () => {
    openDialog(order);
  };

  return (
    <div className='order-card-container' onClick={handleOrderClick}>
      <div className='left-side'>
        <h1>{order.provider.name.toUpperCase()}</h1>
      </div>
      <hr className='vertical-line'></hr>
      <div className='right-side'>
        <div className='right-side-upper'>
          <div className='right-side-left-side'>
            <h2>Teilnehmer</h2>
            <h2>Gesamtpreis</h2>
            <h2>Aktiv bis</h2>
          </div>
          <div className='right-side-right-side'>
            <h2>{order.participants.length}</h2>
            <h2>€ {total.toFixed(2)}</h2>
            <h2>{expireTime}</h2>
          </div>
        </div>
        <div className='right-side-lower'>
          {order.deliveryMethod.toLowerCase() === 'pick-up' ? (
            <p>
              Die Bestellung muss abgeholt werden. Es wird um{' '}
              <span style={{ fontWeight: 700 }}>{expireTime}</span> gelost wer
              sie abholen muss.
            </p>
          ) : (
            <p>
              Die Bestellung wird geliefert. Es wird um{' '}
              <span style={{ fontWeight: 700 }}>{expireTime}</span> gelost wer
              Anrufen muss.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
