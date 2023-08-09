import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { useInput } from 'hooks';
import { loginStateStore, signUpStateStore } from 'store';

import Button from './Button';
import { PORTAL_MODAL } from './CorrectModal';
import { Input } from './Input';
import { Label } from './Label';

const LoginModal = () => {
  const modalRoot = document.getElementById(PORTAL_MODAL);
  const navigate = useNavigate();

  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput();

  // 유효성 검사
  const isId = Boolean(id);
  const isPassword = Boolean(password);
  const disabled = !isId || !isPassword;

  // Auth modal toggle
  const toggleLoginModal = loginStateStore(state => state.toggleModal);
  const toggleSignUpModal = signUpStateStore(state => state.toggleModal);

  const validationClass = 'mt-1 ml-3 mb-3 text-sm';
  const labelClass = 'mt-2 mb-1 ml-3 font-bold';

  if (modalRoot == null) {
    return null;
  }

  return createPortal(
    <div className="absolute top-0 flex items-center justify-center w-screen h-screen bg-black/20">
      <div className="flex flex-col justify-center bg-gray1 w-[500px] h-[450px] rounded-lg p-7 gap-2 shadow-lg">
        <div
          className="ml-auto font-bold transition-all duration-100 cursor-pointer hover:scale-150"
          onClick={() => {
            toggleLoginModal();
          }}
        >
          X
        </div>
        <form>
          <div className={`${labelClass}`}>
            <Label name="id">아이디</Label>
          </div>
          <Input
            name="id"
            inputType="email"
            inputStyleType="auth"
            holderMsg="아이디를 입력해주세요"
            value={id}
            onChange={onChangeId}
          />
          {!isId && <p className={`${validationClass} text-red`}>아이디를 입력해주세요</p>}
          <div className={`${labelClass}`}>
            <Label name="password">비밀번호</Label>
          </div>
          <Input
            name="password"
            inputType="password"
            inputStyleType="auth"
            holderMsg="비밀번호를 입력해주세요"
            value={password}
            onChange={onChangePassword}
          />
          {!isPassword && <p className={`${validationClass} text-red`}>비밀번호를 입력해주세요</p>}
          <div className="mt-12">
            <Button
              buttonStyle="yellow md full"
              onClick={() => {
                alert('로그인!');
                navigate('/');
                toggleLoginModal();
              }}
              disabled={disabled}
            >
              로그인
            </Button>
          </div>
        </form>
        <div
          className="mx-auto mt-4 mb-4 font-bold cursor-pointer text-blue hover:underline hover:underline-offset-4"
          onClick={() => {
            toggleLoginModal();
            toggleSignUpModal();
          }}
        >
          아직 회원이 아니신가요?
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default LoginModal;
