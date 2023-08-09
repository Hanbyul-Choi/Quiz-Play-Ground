import { useLockBodyScroll } from 'hooks';
import { MouseEvent } from 'react';
import Button from '../Button';

interface DiologProps {
  onClose: () => void;
  onSucess?: (event: MouseEvent<HTMLElement>) => void;
  type: string;
  children: React.ReactNode;
}

export const Dialog = ({ onClose, onSucess, type, children }: DiologProps) => {
  const close = (event: MouseEvent<HTMLElement>) => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  useLockBodyScroll(true);

  return (
    <div className="fixed top-0 left-0 bg-black opacity-[0.3] w-full h-full z-50" onClick={close}>
      <div className="flex-col items-center justify-center gap-[25px] absolute top-[50%] left-[50%] -translate-x-center -translate-y-center bg-white rounded-[8px] p-[25px] w-[300px] ">
        <p className="flex items-center justify-center">{children}</p>
        {type === 'Confirm' && onSucess ? (
          <div className="flex items-center justify-center gap-[15px] mt-10">
            <Button buttonStyle="yellow sm" onClick={onClose}>
              취소
            </Button>
            <Button buttonStyle="blue sm" onClick={onSucess}>
              확인
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10">
            <Button buttonStyle="blue sm" onClick={close}>
              확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
