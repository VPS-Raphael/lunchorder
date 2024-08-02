import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../styles/dialogs.css';

Modal.setAppElement('#root');

export default function Dialog({ isOpen, closeModal, styles, id, children }) {
  const [modalClass, setModalClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setModalClass('open');
    } else {
      const timeout = setTimeout(() => setModalClass(''), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={`dialog-container ${modalClass}`}
      id={id}
      overlayClassName='dialog-overlay'
      style={styles}>
      {children}
    </Modal>
  );
}
