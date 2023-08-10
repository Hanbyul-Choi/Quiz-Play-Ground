import React, { useState } from 'react';

import FavoriteGame from './FavoriteGame';
import MyQuestion from './MyQuestion';

type ButtonType = 'myQuestion' | 'favoriteGame';

const MyGame = () => {
  const [activeButton, setActiveButton] = useState<ButtonType>('myQuestion');

  const handleButtonClick = (type: ButtonType) => {
    setActiveButton(type);
  };

  return (
    <div className="flex flex-col mr-12">
      <div className="flex justify-center items-center gap-20 pb-3 border-b border-black">
        <button
          className={`text-[20px] ${activeButton === 'myQuestion' ? 'text-black' : 'text-gray3'}`}
          onClick={() => {
            handleButtonClick('myQuestion');
          }}
        >
          내가 작성한 문제
        </button>
        <button
          className={`text-[20px] ${activeButton === 'favoriteGame' ? 'text-black' : 'text-gray3'}`}
          onClick={() => {
            handleButtonClick('favoriteGame');
          }}
        >
          좋아요한 게임
        </button>
      </div>
      <ul className="w-[450px] mt-4">{activeButton === 'myQuestion' ? <MyQuestion /> : <FavoriteGame />}</ul>
    </div>
  );
};

export default MyGame;
