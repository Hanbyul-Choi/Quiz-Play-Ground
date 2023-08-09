import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const PORTAL_MODAL = 'portal-root';

interface CorrectModalProps {
  toggleModal: () => void;
}

// const elementRef = useRef(document.getElementById(PORTAL_MODAL))

const CorrectModal = ({ toggleModal }: CorrectModalProps) => {
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
      <img src={'./assets/correct.svg'} />
    </div>,
    modalRoot
  );
};

export default CorrectModal;
