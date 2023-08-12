/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Link } from 'react-router-dom';

import { Skeleton } from 'antd';
import { type gameType } from 'api/myGame';
import { type LikeDoc } from 'components/gamelist/GameInfo';

type gamePropType = Record<string, string>;

interface propsType {
  games: gameType[];
  isLoading?: boolean;
  isGamesIdLoading?: boolean;
  refetch?: any;
  isFetching?: boolean;
  likes: LikeDoc[] | undefined;
}

const LikedGame = ({ games, isFetching, likes }: propsType) => {
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
    <ul className="w-[450px] mt-4 flex flex-col h-[calc(62vh-102px)] overflow-scroll">
      {isFetching === true && (
        <>
          <div className="mt-7">
            <Skeleton title={false} active round />
          </div>
          <div className="mt-7">
            <Skeleton title={false} active round />
          </div>
          <div className="mt-7">
            <Skeleton title={false} active round />
          </div>
        </>
      )}
      {games?.map((game, index) => {
        return (
          <div key={index} className="mr-4 transition-all duration-200 cursor-pointer hover:bg-gray1">
            <Link to={`/game/${game.category}/${game.postId}${game.topic !== null ? `?game=${game.topic}` : ''}`}>
              <li>
                <div className="flex mb-3 felx-row">
                  <p className="mt-4 pl-1 text-gray4 text-[12px]">{game.userName}</p>
                  <p className="mt-4 pl-1 text-gray4 text-[12px]">|</p>
                  <p className="mt-4 pl-1 text-gray4 text-[12px]">{new Date(Number(game.date)).toLocaleString()}</p>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray3">
                  <p className="w-[350px] p-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    [{game.category !== undefined && gameCategory[game.category]}] {game.title} | {game.totalQuiz}문항
                    {game.topic != null && ` | ${gameTopic[game.topic]}`}
                  </p>
                  <div className="flex items-center gap-2">
                    <button>
                      <img src={'./assets/SmallLikeOutlined.svg'} alt="like" />
                    </button>
                    <p>
                      {likes?.filter(like => like.postId === game.postId)[0]?.likeUsers.length !== undefined
                        ? likes?.filter(like => like.postId === game.postId)[0]?.likeUsers.length
                        : 0}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          </div>
        );
      })}
    </ul>
  );
};

export default LikedGame;
