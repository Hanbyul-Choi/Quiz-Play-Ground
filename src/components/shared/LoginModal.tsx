import React from 'react';
import { createPortal } from 'react-dom';

import { login } from 'api/auth';
import { FirebaseError } from 'firebase/app';
import { useInput } from 'hooks';
import { loginStateStore, signUpStateStore, userStore } from 'store';

import Button from './Button';
import { useDialog } from './Dialog';
import { Input } from './Input';
import { Label } from './Label';
import { PORTAL_MODAL } from './modal/CorrectModal';

const LoginModal = () => {
  const modalRoot = document.getElementById(PORTAL_MODAL);
  const { Alert } = useDialog();

  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput();

  // 유효성 검사
  const isId = Boolean(id);
  const isPassword = Boolean(password);
  const disabled = !isId || !isPassword;

  // store
  const toggleLoginModal = loginStateStore(state => state.toggleModal);
  const toggleSignUpModal = signUpStateStore(state => state.toggleModal);
  const { loginUser } = userStore();

  const validationClass = 'mt-1 ml-3 mb-3 text-sm';
  const labelClass = 'mt-2 mb-1 ml-3 font-bold';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await login({ id, password });
      const { uid, displayName: name, email } = res;
      loginUser({ uid, email, name });
      toggleLoginModal();
      await Alert('로그인 되었습니다!');
    } catch (error) {
      let errorMassage: string = '';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMassage = '존재하지 않는 이메일입니다. 다시 확인해주세요.';
            break;
          case 'auth/wrong-password':
            errorMassage = '비밀번호가 일치하지 않습니다.';
            break;
          default:
            errorMassage = '로그인에 실패했습니다.';
            break;
        }
      }
      await Alert(errorMassage);
    }
  };

  if (modalRoot == null) {
    return null;
  }

  return createPortal(
    <div className="absolute top-0 z-20 flex items-center justify-center w-screen h-screen bg-black/20">
      <div className="relative bg-white rounded-[10px]">
        <div className="flex flex-col justify-center bg-gray1 w-[500px] h-[450px] border-2 border-black rounded-[10px] p-7 gap-2 shadow-lg">
          <div
            className="ml-auto font-bold transition-all duration-100 cursor-pointer hover:scale-150"
            onClick={() => {
              toggleLoginModal();
            }}
          >
            X
          </div>
          <form
            onSubmit={e => {
              handleLogin(e).catch(error => {
                error.errorHandler(error);
                console.log('로그인 에러 발생');
              });
            }}
          >
            <div className={`${labelClass}`}>
              <Label name="id">아이디</Label>
            </div>
            <div className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <Input
                name="id"
                inputType="email"
                inputStyleType="auth"
                holderMsg="아이디를 입력해주세요"
                value={id}
                onChange={onChangeId}
                border={true}
                autocomplete="on"
              />
            </div>
            {!isId && <p className={`${validationClass} text-red`}>아이디를 입력해주세요</p>}
            <div className={`${labelClass}`}>
              <Label name="password">비밀번호</Label>
            </div>
            <div className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <Input
                name="password"
                inputType="password"
                inputStyleType="auth"
                holderMsg="비밀번호를 입력해주세요"
                value={password}
                onChange={onChangePassword}
                border={true}
              />
            </div>
            {!isPassword && <p className={`${validationClass} text-red`}>비밀번호를 입력해주세요</p>}
            <div className="mt-12">
              <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg">
                <Button buttonStyle="yellow full border " disabled={disabled}>
                  로그인
                </Button>
              </div>
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
        <div className="absolute z-[-10] top-2 left-2 w-[500px] h-[450px] border-b-[12px] border-r-[12px] border-black rounded-[10px]" />
      </div>
    </div>,
    modalRoot
  );
};

export default LoginModal;
