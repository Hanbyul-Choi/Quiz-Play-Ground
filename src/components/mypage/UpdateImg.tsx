import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQueryClient } from 'react-query';

import { updateUserImg } from 'api/auth';
import Button from 'components/shared/Button';
import { useDialog } from 'components/shared/Dialog';
import { PORTAL_MODAL } from 'components/shared/modal/CorrectModal';
import { updateImgStateStore } from 'store';

const updateImg = () => {
  const modalRoot = document.getElementById(PORTAL_MODAL);
  const { toggleModal } = updateImgStateStore();
  const [selectedFile, setSelectedFile] = useState<File>();
  const { Alert } = useDialog();

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

  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>(sessionStorage.getItem('userImg'));
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
        <input type="file" onChange={handleFileSelect} />
        <Button
          buttonStyle="blue md full"
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
    </div>,
    modalRoot
  );
};

export default updateImg;
