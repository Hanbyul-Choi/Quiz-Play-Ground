import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { modalStateStore } from 'store';

import correct from '../../../assets/correct.svg';

export const PORTAL_MODAL = 'portal-root';

const CorrectModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { closeCorrectModal } = modalStateStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        closeCorrectModal();
      }, 500);
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
    <div
      className={`absolute top-[50%] left-[50%] -translate-x-center -translate-y-center ${
        isVisible ? 'animate-fadeIn' : 'animate-fadeOut'
      }`}
    >
      <img src={correct} alt="correct" />
    </div>,
    modalRoot
  );
};

export default CorrectModal;
