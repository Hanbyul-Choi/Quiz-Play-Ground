import React from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQueryClient } from 'react-query';

import { updateUserName } from 'api/auth';
import { Input, Label } from 'components/shared';
import Button from 'components/shared/Button';
import { useDialog } from 'components/shared/Dialog';
import { PORTAL_MODAL } from 'components/shared/modal/CorrectModal';
import { useInput } from 'hooks';
import { updateProfileStateStore, userStore } from 'store';

const ProfileUpdateModal = () => {
  const modalRoot = document.getElementById(PORTAL_MODAL);
  const userName = sessionStorage.getItem('userName');
  if (userName == null) {
    alert('로그인이 되어있지 않습니다');
    return;
  }

  const { Alert } = useDialog();
  const { toggleModal } = updateProfileStateStore();

  const [newName, onChangeNickname] = useInput(userName);
  const userId = sessionStorage.getItem('userId');

  const { updateUser } = userStore();

  const isValidNickname = (): boolean => {
    const nicknameCheck = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]*$/;
    if (newName.length > 1 && nicknameCheck.test(newName)) {
      return false;
    }
    return true;
  };
  const disabled = isValidNickname();

  const validationClass = 'mt-1 ml-3 mb-3 text-sm';
  const labelClass = 'mt-2 mb-1 ml-3 font-bold';

  if (modalRoot == null) {
    return null;
  }

  const queryClient = useQueryClient();
  const mutation = useMutation(updateUserName, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
    }
  });

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (userId !== null) {
        mutation.mutate({ userId, newName });
        // await updateUserName({ userId, newName });
        sessionStorage.setItem('userName', newName);
        toggleModal();
        updateUser();
        await Alert('수정 되었습니다');
      }
    } catch (error) {
      console.log('프로필 수정 오류 발생');
    }
  };

  return createPortal(
    <>
      <div className="absolute top-0 flex items-center justify-center w-screen h-screen bg-black/20">
        <div className="flex flex-col justify-center bg-gray1 w-[500px] h-[280px] rounded-lg p-7 gap-2 shadow-lg">
          <div
            className="ml-auto font-bold transition-all duration-100 cursor-pointer hover:scale-150"
            onClick={toggleModal}
          >
            X
          </div>
          <form
            onSubmit={e => {
              handleUpdate(e).catch(error => {
                error.errorHandler(error);
                console.log('로그인 에러 발생');
              });
            }}
          >
            <div className={`${labelClass}`}>
              <Label name="id">닉네임</Label>
            </div>
            <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <Input
                name="id"
                inputType="text"
                inputStyleType="auth"
                holderMsg="닉네임을 입력해주세요"
                value={newName}
                onChange={onChangeNickname}
                border={true}
              />
            </div>
            {!disabled ? (
              <p className={`${validationClass} text-blue`}>사용가능한 닉네임입니다</p>
            ) : (
              <p className={`${validationClass} text-red`}>두 글자 이상, 영어 또는 한글, 숫자로 입력해주세요</p>
            )}
            <div className="mt-12">
              <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Button buttonStyle="yellow md full" disabled={disabled}>
                  수정하기
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default ProfileUpdateModal;
