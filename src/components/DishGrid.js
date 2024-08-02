import React, { useContext, useState, useEffect } from 'react';
import DishCard from './DishCard';
import UserDataContext from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../Config';
import Dialog from './Dialog';
import TimeInput from './TimeInput';

export default function DishGrid({ providers, dishes }) {
  const { userData } = useContext(UserDataContext);

  // Confirm Dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogText, setConfirmDialogText] = useState('');
  const [confirmDialogHeader, setConfirmDialogHeader] = useState('');

  // Order Dialog
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [expiryTime, setExpiryTime] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pick-up');

  const [providerName, setProviderName] = useState('');
  const [dish, setDish] = useState({});
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && dish) {
      setIsConfirmDialogOpen(true);
    }
  }, [isLoading, dish]);

  const openOrderDialog = () => {
    setIsOrderDialogOpen(true);
  };

  const openConfirmDialog = async (dish) => {
    if (!userData) {
      navigate('/login');
      return;
    }

    setDish(dish);
    setIsLoading(true);

    try {
      const response = await axios.get(`${SERVER_URL}/order/active`, {});
      const activeOrders = response.data;

      let providerName = '{providerName}';
      for (const provider of providers) {
        for (const userDish of provider.dishes) {
          if (userDish.id === dish.id) providerName = provider.name;
        }
      }
      setProviderName(providerName);

      if (!activeOrders) {
        setConfirmDialogText(
          `Es existiert keine Bestellung von ${providerName.toUpperCase()}. Möchtest du eine neue starten?`
        );
        setConfirmDialogHeader('Bestellung starten');
        return;
      }

      const order = activeOrders.find(
        (order) =>
          order.provider.name === providerName && order.isActive === true
      );
      setOrder(order);

      if (order) {
        setConfirmDialogText(
          `Es wurde bereits eine Bestellung von ${providerName.toUpperCase()} gestartet. Möchtest du mitbestellen?`
        );
        setConfirmDialogHeader('Bestellen');
      } else {
        setConfirmDialogText(
          `Es existiert keine Bestellung von ${providerName.toUpperCase()}. Möchtest du eine neue starten?`
        );
        setConfirmDialogHeader('Bestellung starten');
      }
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);
  const closeOrderDialog = () => setIsOrderDialogOpen(false);

  const handleConfirm = async () => {
    closeConfirmDialog();

    /* Check if an order exists */
    if (order) {
      // Order exists
      const orderData = {
        providerName: providerName,
        userId: userData.slackId,
        dish: dish,
        slackId: userData.slackId,
      };

      // Update order
      try {
        await axios.post(`${SERVER_URL}/order`, {
          orderData,
        });
      } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
      }
    } else {
      closeConfirmDialog();
      openOrderDialog();
    }
  };

  const handleStartOrder = async () => {
    closeOrderDialog();
    // Create order data
    const [hours, minutes] = expiryTime.split(':').map(Number);
    const now = new Date();

    const expiryDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (expiryDate <= now) {
      expiryDate.setMinutes(now.getMinutes() + 1);
      expiryDate.setSeconds(0);
    }

    const orderData = {
      providerName: providerName,
      slackId: userData.slackId,
      expiryDate: expiryDate,
      deliveryMethod: deliveryMethod,
      dish: dish,
    };

    // Update order
    try {
      await axios.post(`${SERVER_URL}/order`, {
        orderData,
      });
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  const toggleDeliveryMethod = () => {
    if (deliveryMethod === 'delivery') setDeliveryMethod('pick-up');
    else setDeliveryMethod('delivery');
  };

  if (!dishes || dishes.length === 0) {
    return (
      <div className='not-found-container'>
        <h1>Es wurden keine passenden Produkte gefunden!</h1>
      </div>
    );
  }

  const confirmDialogStyles = {
    content: {
      width: '500px',
    },
  };

  return (
    <div className='dishes-container'>
      <Dialog
        isOpen={isConfirmDialogOpen}
        closeModal={closeConfirmDialog}
        styles={confirmDialogStyles}>
        <div className='confirm-dialog-container'>
          <div className='confirm-dialog-header'>
            <h2>{confirmDialogHeader}</h2>
            <button onClick={closeConfirmDialog}>
              <svg
                width='14'
                height='14'
                viewBox='0 -2 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='p-icon p-dialog-header-close-icon'
                aria-hidden='true'
                data-pc-section='closebuttonicon'>
                <path
                  d='M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z'
                  fill='currentColor'></path>
              </svg>
            </button>
          </div>
          <div className='confirm-dialog-body'>
            <p>{confirmDialogText}</p>
          </div>
          <div className='confirm-dialog-footer'>
            <button
              onClick={closeConfirmDialog}
              className='confirm-dialog-close-button'>
              Nein
            </button>
            <button
              onClick={handleConfirm}
              className='confirm-dialog-confirm-button'>
              Ja
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isOrderDialogOpen}
        closeModal={closeOrderDialog}
        styles={confirmDialogStyles}>
        <div className='order-dialog-container'>
          <div className='order-dialog-header'>
            <h2>Bestellung starten</h2>
            <button onClick={closeOrderDialog}>
              <svg
                width='14'
                height='14'
                viewBox='0 -2 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='p-icon p-dialog-header-close-icon'
                aria-hidden='true'
                data-pc-section='closebuttonicon'>
                <path
                  d='M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z'
                  fill='currentColor'></path>
              </svg>
            </button>
          </div>
          <div className='order-dialog-body'>
            <div className='time-picker-container'>
              <h3>Aktiv Bis: </h3>
              <TimeInput
                expiryTime={expiryTime}
                setExpiryTime={setExpiryTime}></TimeInput>
            </div>
            <div className='rad-container'>
              <label className='rad-label'>
                <input
                  type='radio'
                  className='rad-input'
                  name='rad'
                  defaultChecked
                  onChange={toggleDeliveryMethod}
                />
                <div className='rad-design'></div>
                <div className='rad-text'>Abholen</div>
              </label>

              <label className='rad-label'>
                <input
                  type='radio'
                  className='rad-input'
                  name='rad'
                  onChange={toggleDeliveryMethod}
                />
                <div className='rad-design'></div>
                <div className='rad-text'>Liefern</div>
              </label>
            </div>
          </div>
          <div className='order-dialog-footer'>
            <button
              onClick={closeOrderDialog}
              className='order-dialog-close-button'>
              Nein
            </button>
            <button
              onClick={handleStartOrder}
              className='order-dialog-confirm-button'>
              Ja
            </button>
          </div>
        </div>
      </Dialog>
      {dishes.map((dish) => (
        <DishCard
          dishId={dish.id}
          openModal={openConfirmDialog}
          key={dish.id}
        />
      ))}
    </div>
  );
}
