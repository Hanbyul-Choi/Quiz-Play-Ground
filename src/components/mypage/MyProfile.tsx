import React from 'react';

import Button from 'components/shared/Button';
import { userStore } from 'store';

const MyProfile = () => {
  const { userEmail, userName } = userStore();

  return (
    <div className="flex flex-col items-center ml-12">
      <div className="flex">
        <p className="mt-5 mr-4 text-right ">
          {userEmail}님, <br />
          오늘도 즐거운 게임하세요!
        </p>
        <div className="flex flex-col items-center ">
          <button>
            <img src={'./assets/DefaultProfile.svg'} alt="profileImage" />
          </button>
          <button>Edit</button>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Button buttonStyle="blue md" onClick={() => {}}>
          프로필 수정
        </Button>
        <Button buttonStyle="yellow md" onClick={() => {}}>
          게임 만들기
        </Button>
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
  );
};

export default MyProfile;
