import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const PORTAL_MODAL = 'portal-root';

interface InCorrectModalProps {
  toggleModal: () => void;
}

const InCorrectModal = ({ toggleModal }: InCorrectModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const modalRoot = document.getElementById(PORTAL_MODAL);

  if (modalRoot == null) {
    return null;
  }

  return createPortal(
    <div className="absolute ml-[34%]">
      <img src={'./assets/incorrect.svg'} />
    </div>,
    modalRoot
  );
};

export default InCorrectModal;
