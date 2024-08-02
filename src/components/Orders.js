import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Config';
import OrderCard from './OrderCard';
import Dialog from './Dialog';
import UserDataContext from '../context/UserDataContext';

export default function Orders() {
  const { userData } = useContext(UserDataContext);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderOverviewDialogOpen, setIsOrderOverviewDialogOpen] =
    useState(false);

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const fetchActiveOrders = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/order/active`);
      setActiveOrders(response.data);
    } catch (error) {
      console.error('Error fetching active orders:', error);
    }
  };

  const openOrderOverviewDialog = () => {
    setIsOrderOverviewDialogOpen(true);
  };

  const closeOrderOverviewDialog = () => setIsOrderOverviewDialogOpen(false);

  const handleOrderClick = (order) => {
    openOrderOverviewDialog();
    setSelectedOrder(order);
  };

  const handleDelete = async (order, userDishId, token) => {
    const data = {
      order,
      userDishId,
      token,
    };
    try {
      const response = await axios.post(`${SERVER_URL}/order/delete/userdish`, {
        data,
      });
      if (!response.data) closeOrderOverviewDialog();
      setSelectedOrder(response.data);
      await fetchActiveOrders();
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  const orderOverviewDialogStyles = {
    content: {
      width: '1200px',
    },
  };

  return (
    <div className='main-container'>
      {selectedOrder ? (
        <Dialog
          isOpen={isOrderOverviewDialogOpen}
          closeModal={closeOrderOverviewDialog}
          styles={orderOverviewDialogStyles}
          id='order-overview-dialog'>
          <div className='order-overview-dialog-container'>
            <div className='order-overview-dialog-header'>
              <h1>{selectedOrder.provider.name.toUpperCase()}</h1>
            </div>
            <div className='order-overview-dialog-body'>
              <div className='info-container'>
                <div className='s1'>
                  <h2>MENÜ</h2>
                </div>
                <div className='s2'>
                  <h2>ANZAHL</h2>
                </div>
                <div className='s3'>
                  <h2>PERSON</h2>
                </div>
                <div className='s4'></div>
              </div>
            </div>
            <div className='data-container'>
              {selectedOrder.participants.map((participant) => {
                const dishes = participant.dishes.filter(
                  (userDish) =>
                    userDish.dish.provider.name === selectedOrder.provider.name
                );
                return dishes.map((userDish) => {
                  return (
                    <React.Fragment key={userDish.id}>
                      <div className='user-data-container'>
                        <div className='s1'>
                          <p>{userDish.dish.name}</p>
                        </div>
                        <div className='s2'>
                          <p>{userDish.quantity}</p>
                        </div>
                        <div className='s3'>
                          <p>
                            {participant.firstName} {participant.lastName}
                          </p>
                        </div>
                        <div className='s4'>
                          {participant.slackId === userData.slackId ? (
                            <div id='order-overview-icon-container'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                width='25'
                                height='25'>
                                <path d='M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z' />
                              </svg>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                width='25'
                                height='25'
                                onClick={() =>
                                  handleDelete(
                                    selectedOrder,
                                    userDish.id,
                                    userData.token
                                  )
                                }>
                                <path d='M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z' />
                                <path d='M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z' />
                                <path d='M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z' />
                              </svg>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                });
              })}
            </div>
            <div className='order-overview-dialog-footer'></div>
          </div>
        </Dialog>
      ) : (
        <></>
      )}

      <div className='title-container'>
        <h1>AKTIVE BESTELLUNGEN</h1>
        <h3>
          <span style={{ color: '#3c74a4' }}>{activeOrders.length} </span>
          {activeOrders.length === 1
            ? 'Aktive Bestellung'
            : 'Aktive Bestellungen'}
        </h3>
        <hr />
      </div>
      {activeOrders.length === 0 ? (
        <div className='not-found-container'>
          <h1>Es wurde keine aktive Bestellung gefunden!</h1>
        </div>
      ) : (
        <div className='orders-container'>
          {activeOrders.map((order) => {
            return (
              <OrderCard
                order={order}
                key={order.id}
                openDialog={handleOrderClick}></OrderCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
