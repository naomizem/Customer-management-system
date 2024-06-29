import React, { FC } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
  confirmText?: string;
  cancelText?: string;
}

const Modal: FC<ModalProps> = ({
  show,
  onHide,
  onConfirm,
  title,
  body,
  confirmText = 'אישור',
  cancelText = 'ביטול',
}) => {
  return (
    <BootstrapModal show={show} onHide={onHide} className="modal-rtl">
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title className="text-right">{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="text-right">{body}</BootstrapModal.Body>
      <BootstrapModal.Footer className="text-right">
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
