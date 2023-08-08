import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const PORTAL_MODAL = 'portal-root';

interface CorrectModalProps {
  toggleModal: () => void;
}

const CorrectModal: React.FC<CorrectModalProps> = ({ toggleModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return createPortal(
    <div className="flex justify-center items-center h-screen">
      <img src={'./assets/correct.svg'} />
    </div>,
    document.getElementById(PORTAL_MODAL)!
  );
};

export default CorrectModal;
