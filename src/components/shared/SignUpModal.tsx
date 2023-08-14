import React from 'react';
import { createPortal } from 'react-dom';

import { signup } from 'api/auth';
import { FirebaseError } from 'firebase/app';
import { useInput } from 'hooks';
import { loginStateStore, signUpStateStore } from 'store';

import Button from './Button';
import { useDialog } from './Dialog';
import { Input } from './Input';
import { Label } from './Label';
import { PORTAL_MODAL } from './modal/CorrectModal';

const SignUpModal = () => {
  const modalRoot = document.getElementById(PORTAL_MODAL);
  const { Alert } = useDialog();

  const [id, onChangeId] = useInput();
  const [nickname, onChangeNickname] = useInput();
  const [password, onChangePassword] = useInput();
  const [passwordConf, onChangePasswordConf] = useInput();

  // 유효성 검사
  const isValidId = (): boolean => {
    const emailCheck = /\S+@\S+\.\S+/;
    if (emailCheck.test(id)) {
      return false;
    }
    return true;
  };
  const isValidNickname = (): boolean => {
    const nicknameCheck = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]*$/;
    if (nickname.length > 1 && nicknameCheck.test(nickname) && nickname.length < 11) {
      return false;
    }
    return true;
  };
  const isValidPassword = (): boolean => {
    const specialChars = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]*$/;
    if (password.length > 7 && specialChars.test(password)) {
      return false;
    }

    return true;
  };
  const isValidPasswordConf = (): boolean => {
    if (passwordConf === password) {
      return false;
    }
    return true;
  };
  const isId = isValidId();
  const isPassword = isValidPassword();
  const isNickname = isValidNickname();
  const isPasswordConf = isValidPasswordConf();
  const disabled = isId || isNickname || isPassword || isPasswordConf;

  // Auth modal toggle
  const toggleLoginModal = loginStateStore(state => state.toggleModal);
  const toggleSignUpModal = signUpStateStore(state => state.toggleModal);

  const validationClass = 'mt-1 ml-3 mb-3 text-sm';
  const labelClass = 'mt-2 mb-1 ml-3 font-bold';

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await signup({ id, password, nickname });
      toggleSignUpModal();
      await Alert(`회원가입에 성공했습니다. 로그인해주세요!`);
    } catch (error) {
      let errorMassage: string = '';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMassage = '이미 사용중인 이메일입니다.';
            break;
          default:
            errorMassage = '회원가입에 실패했습니다.';
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
        <div className="flex flex-col justify-center bg-gray1 w-[500px] h-[650px] border-2 border-black rounded-[10px] p-7 gap-2 shadow-lg">
          <div
            className="ml-auto font-bold transition-all duration-100 cursor-pointer hover:scale-150"
            onClick={() => {
              toggleSignUpModal();
            }}
          >
            X
          </div>
          <form
            onSubmit={e => {
              handleSignup(e).catch(error => {
                error.errorHandler(error);
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
              />
            </div>
            {!isId ? (
              <p className={`${validationClass} text-blue`}>사용가능한 아이디입니다</p>
            ) : (
              <p className={`${validationClass} text-red`}>이메일 형식으로 입력해주세요</p>
            )}
            <div className={`${labelClass}`}>
              <Label name="nickname">닉네임</Label>
            </div>
            <div className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <Input
                name="nickname"
                inputType="text"
                inputStyleType="auth"
                holderMsg="닉네임을 입력해주세요"
                value={nickname}
                onChange={onChangeNickname}
                border={true}
              />
            </div>
            {!isNickname ? (
              <p className={`${validationClass} text-blue`}>사용가능한 닉네임입니다</p>
            ) : (
              <p className={`${validationClass} text-red`}>
                두 글자 이상 열 글자 이하, 영어 또는 한글, 숫자로 입력해주세요
              </p>
            )}
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
            {!isPassword ? (
              <p className={`${validationClass} text-blue`}>사용가능한 비밀번호입니다</p>
            ) : (
              <p className={`${validationClass} text-red`}>8자리 이상이어야 하며, 영어와 숫자로 입력해주세요</p>
            )}
            <div className={`${labelClass}`}>
              <Label name="passwordConf">비밀번호 확인</Label>
            </div>
            <div className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <Input
                name="passwordConf"
                inputType="password"
                inputStyleType="auth"
                holderMsg="비밀번호를 확인해주세요"
                value={passwordConf}
                onChange={onChangePasswordConf}
                border={true}
              />
            </div>
            {!isPasswordConf ? (
              <p className={`${validationClass} text-blue`}>비밀번호가 일치합니다</p>
            ) : (
              <p className={`${validationClass} text-red`}>비밀번호가 일치하지 않습니다</p>
            )}

            <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg mt-12">
              <Button buttonStyle="yellow full border " disabled={disabled}>
                회원가입
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
            이미 회원이신가요?
          </div>
        </div>
        <div className="absolute z-[-10] top-2 left-2 w-[500px] h-[650px] border-b-[12px] border-r-[12px] border-black rounded-[10px]" />
      </div>
    </div>,
    modalRoot
  );
};

export default SignUpModal;
