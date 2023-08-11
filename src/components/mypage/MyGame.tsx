import React, { useState } from 'react';


import LikedGame from './LikedGame';
import MadeGame from './MadeGame';

const MyGame = () => {
  const [activeButton, setActiveButton] = useState<'myQuestion' | 'favoriteGame'>('myQuestion');
  const [isMadeGameOpen, setIsMadeGameOpen] = useState(true);


  const handleButtonClick = (type: ButtonType) => {
    setActiveButton(type);
  };

  return (
    <div className="flex flex-col mr-12 w-[450px]">
      <div className="flex items-center gap-20 pb-3 border-b border-black justify-evenly ">
        <button
          className={`text-[20px] ${activeButton === 'myQuestion' ? 'text-black' : 'text-gray3'}
          `}
          onClick={() => {
            handleButtonClick('myQuestion');
            setIsMadeGameOpen(true);
          }}
        >
          내가 작성한 문제
        </button>
        <button
          className={`text-[20px] ${activeButton === 'favoriteGame' ? 'text-black' : 'text-gray3'}`}
          onClick={() => {
            handleButtonClick('favoriteGame');
            setIsMadeGameOpen(false);
          }}
        >
          좋아요한 게임
        </button>
      </div>
      {isMadeGameOpen && <MadeGame />}
      {!isMadeGameOpen && <LikedGame />}

    </div>
  );
};

export default MyGame;
