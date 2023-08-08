import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const PORTAL_MODAL = 'portal-root';

interface InCorrectModalProps {
  toggleModal: () => void;
}

const InCorrectModal: React.FC<InCorrectModalProps> = ({ toggleModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return createPortal(
    <div className="flex justify-center items-center h-screen">
      <img src={'./assets/incorrect.svg'} />
    </div>,
    document.getElementById(PORTAL_MODAL)!
  );
};

export default InCorrectModal;
