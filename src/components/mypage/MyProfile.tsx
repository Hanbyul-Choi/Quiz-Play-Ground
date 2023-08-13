import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { Skeleton } from 'antd';
import { getUser } from 'api/auth';
import Button from 'components/shared/Button';
import { activeButtonStore, updateImgStateStore, updateProfileStateStore, userStore } from 'store';

import ProfileUpdateModal from './ProfileUpdateModal';
import UpdateImg from './UpdateImg';

const MyProfile = () => {
  const setActiveButton = activeButtonStore(state => state.setActiveButton);
  const { isModalOpen, toggleModal } = updateProfileStateStore();
  const { isModalOpen: isUpdateImgModalOpen, toggleModal: toggleImgModal } = updateImgStateStore();
  const { userId, userName, userEmail } = userStore();
  const [userImg, setUserImg] = useState('');

  const { data, isLoading, refetch } = useQuery('user', async () => await getUser(userId));

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      void refetch();
      setUserImg(data[0]?.userImg as string);
    }
  }, [isLoading, data]);

  useEffect(() => {
    void refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="w-[320px] ml-12 text-center flex justify-center">
        <Skeleton.Avatar active size={150} />
      </div>
    );
  }

  return (
    <>
      {isModalOpen && <ProfileUpdateModal />}
      {isUpdateImgModalOpen && <UpdateImg />}
      <div className="flex flex-col items-center ml-12">
        <div className="flex">
          <div className="flex flex-col items-center ">
            <button>
              {userImg !== undefined ? (
                <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <img
                    className="object-cover w-[150px] h-[150px] rounded-full shadow-md"
                    src={userImg}
                    alt="profileImage"
                  />
                </div>
              ) : (
                <div className="bg-gray2 w-[150px] h-[150px] rounded-full shadow-md"></div>
              )}
            </button>
            <button className="mt-1 text-blue" onClick={toggleImgModal}>
              Edit
            </button>
            <p className="mt-5 mr-4 text-center ">
              <span className="font-bold">{userName}</span>님, <br />
              오늘도 즐거운 게임하세요!
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <Button
            buttonStyle="blue md"
            onClick={() => {
              toggleModal();
            }}
          >
            프로필 수정
          </Button>
          <Link to={`/addgame`}>
            <Button
              buttonStyle="yellow md"
              onClick={() => {
                setActiveButton('addGame');
              }}
            >
              게임 만들기
            </Button>
          </Link>
        </div>
        <div className="relative flex items-center w-full p-6 mt-8 bg-white border border-black rounded-md shadow-lg">
          <div className="flex flex-col gap-2 mr-4">
            <p>ID</p>
            <p>닉네임</p>
          </div>
          <img src={'./assets/Line.svg'} />
          <div className="flex flex-col gap-2 ml-4">
            <p>{userEmail}</p>
            <p>{userName}</p>
          </div>
          <div className="absolute z-[-10] top-1 left-1 w-[380px] h-[118px] border-b-[10px] border-r-[10px] border-black rounded-[10px]" />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
