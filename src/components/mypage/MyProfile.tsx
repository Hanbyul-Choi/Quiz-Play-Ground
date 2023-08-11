
import { Link } from 'react-router-dom';
import React from 'react';
import { useQuery } from 'react-query';


import { getUser } from 'api/auth';
import Button from 'components/shared/Button';

import { activeButtonStore } from 'store';
import { updateImgStateStore, updateProfileStateStore } from 'store';
import ProfileUpdateModal from './ProfileUpdateModal';
import UpdateImg from './UpdateImg';

const MyProfile = () => {
  const setActiveButton = activeButtonStore(state => state.setActiveButton);
  const { isModalOpen, toggleModal } = updateProfileStateStore();
  const { isModalOpen: isUpdateImgModalOpen, toggleModal: toggleImgModal } = updateImgStateStore();
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName');
  const userEmail = sessionStorage.getItem('userEmail');
  let userImg: string | undefined = '';

  const { data } = useQuery('user', async () => await getUser(userId));
  if (data !== undefined) {
    userImg = data[0].userImg;
  }


  return (
    <>
      {isModalOpen && <ProfileUpdateModal />}
      {isUpdateImgModalOpen && <UpdateImg />}
      <div className="flex flex-col items-center ml-12">
        <div className="flex">
          <div className="flex flex-col items-center ">
            <button>
              <img
                className="object-cover w-[150px] h-[150px] rounded-full shadow-md"
                src={`${userImg ?? ''}`}
                alt="profileImage"
              />
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

      </div>
      <div className="flex gap-3 mt-6">
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
      <div className="flex items-center mt-8 p-6 border border-black rounded-md shadow-lg">
        <div className="flex flex-col gap-2 mr-4">
          <p>ID</p>
          <p>닉네임</p>

        </div>
        <div className="flex items-center w-full p-6 mt-8 border border-black rounded-md shadow-lg">
          <div className="flex flex-col gap-2 mr-4">
            <p>ID</p>
            <p>닉네임</p>
          </div>
          <img src={'./assets/Line.svg'} />
          <div className="flex flex-col gap-2 ml-4">
            <p>{userEmail}</p>
            <p>{userName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
