import React, { FC } from 'react';
import './ToastNotification.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { clearMessage } from '../../redux/slices/messageSlice';

interface ToastNotificationProps {}

const ToastNotification: FC<ToastNotificationProps> = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.messageSlice.message);

  if (!message) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearMessage());
  };

  let toastClassName = '';
  if (message.type === 'error') {
    toastClassName = 'error-toast';
  } else if (message.type === 'success') {
    toastClassName = 'success-toast';
  }

  return (
    <div className="ToastNotification">
      <Toast show={!!message} onClose={handleClose} delay={3000} autohide className={toastClassName}>
        <Toast.Body>{message.text}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;
