import React from 'react';
import { Link } from 'react-router-dom';

const GameLists = () => {
  return (
    <section className="game-list flex-col justify-center items-center mt-10">
      <div className="game relative w-full h-[92px] border-b-[1px] border-gray4 mb-10">
        <Link to={`/game/relay/asda`}>
          <div className=" text-gray4 text-sm">익명의 눈사람 | 2023.08.07</div>
          <div className="mt-4 text-lg "> [이어말하기] 예능게임 | 20문항 | 속담</div>
        </Link>
        <img className="absolute top-0 right-0" src={'./assets/icons/BookOutlined.svg'} />
        <div className="flex items-center gap-2 absolute bottom-2 right-2">
          <img src={'./assets/icons/LikeOutLined.svg'} />
          125
        </div>
      </div>
      <div className="game relative w-full h-[92px] border-b-[1px] border-gray4 mb-10">
        <Link to={`/game/relay/asda`}>
          <div className=" text-gray4 text-sm">익명의 눈사람 | 2023.08.07</div>
          <div className="mt-4 text-lg "> [이어말하기] 예능게임 | 20문항 | 속담</div>
        </Link>
        <img className="absolute top-0 right-0" src={'./assets/icons/BookOutlined.svg'} />
        <div className="flex items-center gap-2 absolute bottom-2 right-2">
          <img src={'./assets/icons/LikeOutLined.svg'} />
          125
        </div>
      </div>
      <div className="game relative w-full h-[92px] border-b-[1px] border-gray4 mb-10">
        <Link to={`/game/relay/asda`}>
          <div className=" text-gray4 text-sm">익명의 눈사람 | 2023.08.07</div>
          <div className="mt-4 text-lg "> [이어말하기] 예능게임 | 20문항 | 속담</div>
        </Link>
        <img className="absolute top-0 right-0" src={'./assets/icons/BookOutlined.svg'} />
        <div className="flex items-center gap-2 absolute bottom-2 right-2">
          <img src={'./assets/icons/LikeOutLined.svg'} />
          125
        </div>
      </div>
    </section>
  );
};

export default GameLists;
