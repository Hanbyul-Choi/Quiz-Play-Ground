import React, { useState } from 'react';

const MyGame = () => {
  const [activeButton, setActiveButton] = useState('myQuestion');

  return (
    <div className="flex flex-col mr-12">
      <div className="flex justify-center items-center gap-20 pb-3 border-b border-black">
        <button
          className={`text-[20px] ${activeButton === 'myQuestion' ? 'text-black' : 'text-gray3'}`}
          onClick={() => {
            setActiveButton('myQuestion');
          }}
        >
          내가 작성한 문제
        </button>
        <button
          className={`text-[20px] ${activeButton === 'favoriteGame' ? 'text-black' : 'text-gray3'}`}
          onClick={() => {
            setActiveButton('favoriteGame');
          }}
        >
          찜한 게임
        </button>
      </div>
      <ul className="w-[450px] mt-4">
        <li>
          <div className="flex">
            <p className="mt-4 pl-1 text-gray4 text-[12px]">익명의 기러기</p>
            <p className="mt-4 pl-1 text-gray4 text-[12px]">|</p>
            <p className="mt-4 pl-1 text-gray4 text-[12px]">2023.08.09</p>
          </div>
          <div className="flex justify-between pb-2 border-b border-gray3">
            <p className="p-1">[이어 말하기] 예능 게임 | 20문항 | 속담</p>
            <div className="flex gap-2">
              <button>
                <img className="mb-2" src={'./assets/SmallLikeOutlined.svg'} alt="like" />
              </button>
              <p>115</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MyGame;
