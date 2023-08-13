import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getUser, updateUserImg } from 'api/auth';
import Button from 'components/shared/Button';
import { useDialog } from 'components/shared/Dialog';
import { PORTAL_MODAL } from 'components/shared/modal/CorrectModal';
import { updateImgStateStore, userStore } from 'store';

const updateImg = () => {
  const modalRoot = document.getElementById(PORTAL_MODAL);
  const { toggleModal } = updateImgStateStore();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>(sessionStorage.getItem('userImg'));
  const { Alert } = useDialog();
  const { userId } = userStore();

  const { data } = useQuery('user', async () => await getUser(userId));
  useEffect(() => {
    if (data !== undefined) {
      setImgPreview(data[0]?.userImg as string);
    }
  }, [data]);

  const queryClient = useQueryClient();
  const mutation = useMutation(updateUserImg, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user');
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setPreviewImg(e);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile !== undefined) {
      try {
        mutation.mutate(selectedFile);
        toggleModal();
        await Alert('수정되었습니다');
      } catch (error) {
        console.log('이미지 업로드 오류');
      }
    }
  };

  const setPreviewImg = (event: any) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event.target !== null) {
        setImgPreview(event.target.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  if (modalRoot == null) {
    return null;
  }

  return createPortal(
    <div className="absolute top-0 flex items-center justify-center w-screen h-screen bg-black/20">
      <div className="flex flex-col justify-center items-center bg-gray1 w-[500px] h-[450px] rounded-lg p-7 gap-2 shadow-lg">
        <div
          className="ml-auto font-bold transition-all duration-100 cursor-pointer hover:scale-150"
          onClick={toggleModal}
        >
          X
        </div>
        <img className="object-cover w-[250px] h-[250px] rounded-full" alt="미리보기" src={imgPreview as string} />
        <label htmlFor="newUserImg" className="p-1 border-2 border-black rounded-lg cursor-pointer hover:bg-gray2">
          사진 선택
        </label>
        <input id="newUserImg" type="file" onChange={handleFileSelect} className="hidden" />
        <div className="w-full mt-1">
          <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <Button
              buttonStyle="blue full"
              onClick={() => {
                handleUpload().catch(error => {
                  error.errorHandler(error);
                  console.log('사진 업로드 에러 발생');
                });
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default updateImg;
