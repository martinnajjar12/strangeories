import React from 'react';
import { Modal } from '@material-ui/core';

const FormModal = ({
  ModalBody,
  open,
  handleClose,
}: {
  ModalBody: React.ComponentType;
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <ModalBody />
    </Modal>
  );
};

export default FormModal;
