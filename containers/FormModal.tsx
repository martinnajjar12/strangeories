import { Modal } from '@material-ui/core';
import { useToken } from '../auth/useToken';

const FormModal = ({
  ModalBody,
  open,
  handleClose,
}: {
  ModalBody: React.FC;
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
      {/* <ModalBody /> */}
      <div>
        <h1>Hello world</h1>
      </div>
    </Modal>
  );
};

export default FormModal;
