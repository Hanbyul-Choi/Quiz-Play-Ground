import React from 'react';

import { Skeleton } from 'antd';
import { type gameType } from 'api/myGame';

type gamePropType = Record<string, string>;

interface propsType {
  games: gameType[];
  gamesId: any;
  isLoading?: boolean;
  refetch?: any;
}

const LikedGame = ({ games, gamesId }: propsType) => {
  const gameCategory: gamePropType = {
    relay: '이어말하기',
    nonsensequiz: '넌센스 퀴즈',
    mzwordsquiz: '신조어 퀴즈'
  };

  const gameTopic: gamePropType = {
    proverb: '속담',
    idiom: '사자성어',
    '4words': '일상단어'
  };

  return (
    <ul className="w-[450px] mt-4">
      <li>
        {gamesId != null ? (
          <div className="flex flex-col">
            {games?.map((game, index) => {
              return (
                <div key={index} className="transition-all duration-200 cursor-pointer hover:bg-gray1">
                  <div className="flex mb-3 felx-row">
                    <p className="mt-4 pl-1 text-gray4 text-[12px]">{game.userName}</p>
                    <p className="mt-4 pl-1 text-gray4 text-[12px]">|</p>
                    <p className="mt-4 pl-1 text-gray4 text-[12px]">{game.date}</p>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray3">
                    <p className="p-1">
                      [{game.category !== undefined && gameCategory[game.category]}] {game.title} | {game.totalQuiz}문항
                      {game.topic !== undefined ? ` | ${gameTopic[game.topic]}` : ''}
                    </p>
                    <div className="flex gap-2">
                      <button>
                        <img className="mb-2" src={'./assets/SmallLikeOutlined.svg'} alt="like" />
                      </button>
                      <p>115</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mt-7">
              <Skeleton title={false} active round />
            </div>
            <div className="mt-7">
              <Skeleton title={false} active round />
            </div>
            <div className="mt-7">
              <Skeleton title={false} active round />
            </div>
          </div>
        )}
      </li>
    </ul>
  );
};

export default LikedGame;
