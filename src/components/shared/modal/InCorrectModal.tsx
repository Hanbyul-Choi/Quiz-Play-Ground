import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useSound from 'hooks/useSound';

import wrongsound from '../../../assets/audio/worngsound.mp3';
import incorrect from '../../../assets/incorrect.svg';

export const PORTAL_MODAL = 'portal-root';

interface InCorrectModalProps {
  toggleModal: () => void;
}

const InCorrectModal = ({ toggleModal }: InCorrectModalProps): React.ReactPortal | null => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        toggleModal();
      }, 500);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [toggleModal]);

  useSound(wrongsound, 0.8, 2000);

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
      <img src={incorrect} alt="InCorrect" />
    </div>,
    modalRoot
  );
};

export default InCorrectModal;
