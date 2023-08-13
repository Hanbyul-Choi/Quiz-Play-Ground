import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { Skeleton } from 'antd';
import { getGameLikes } from 'api/gameLikes';
import { type gameType, getMadeGames, getLikedGamesId, getLikedGames } from 'api/myGame';
import { userStore } from 'store';

import LikedGame from './LikedGame';
import MadeGame from './MadeGame';

type ButtonType = 'myQuestion' | 'favoriteGame';

const MyGame = () => {
  const [isMadeGameOpen, setIsMadeGameOpen] = useState(true);
  const [activeButton, setActiveButton] = useState<ButtonType>('myQuestion');
  const { userId } = userStore();

  const handleButtonClick = (type: ButtonType) => {
    setActiveButton(type);
  };

  const {
    data: games,
    isLoading,
    refetch
  } = useQuery('MadeGameLists', async () => await getMadeGames(userId as string));

  // useEffect(() => {
  //   if (!isLoading && games !== undefined) {
  //     void refetch();
  //   }
  // }, [isLoading, games]);

  const {
    data: gamesId,
    isLoading: isGamesIdLoading,
    refetch: refetchGamesId
  } = useQuery('GameLikes', async () => await getLikedGamesId(userId as string));
  const {
    data: gamesLiked,
    isLoading: isGameLikedLoading,
    refetch: refetchGamesLiked,
    isFetching
  } = useQuery('LikedGameLists', async () => await getLikedGames(gamesId as gameType[]));

  useEffect(() => {
    if (!isGameLikedLoading && gamesId !== undefined && !isGamesIdLoading) {
      void refetchGamesId();
      void refetchGamesLiked();
    }
  }, [isGameLikedLoading, gamesId, isGamesIdLoading]);

  const { data: likes } = useQuery('gameLike', getGameLikes);

  return (
    <div className="flex flex-col mr-12 w-[450px] h-[calc(82vh-60px)] overflow-y-hidden">
      <div className="flex items-center gap-20 pb-3 justify-evenly ">
        <button
          className={`text-[20px] ${activeButton === 'myQuestion' ? 'text-black underline' : 'text-gray3'}`}
          onClick={() => {
            handleButtonClick('myQuestion');
            setIsMadeGameOpen(true);
          }}
        >
          내가 작성한 문제
        </button>
        <button
          className={`text-[20px] ${activeButton === 'favoriteGame' ? 'text-black underline' : 'text-gray3'}`}
          onClick={() => {
            handleButtonClick('favoriteGame');
            setIsMadeGameOpen(false);
          }}
        >
          좋아요한 게임
        </button>
      </div>
      {isLoading || isGameLikedLoading || isGamesIdLoading ? (
        <>
          <div className="mr-12 mt-7">
            <Skeleton title={false} active round />
          </div>
          <div className="mr-12 mt-7">
            <Skeleton title={false} active round />
          </div>
          <div className="mr-12 mt-7">
            <Skeleton title={false} active round />
          </div>
        </>
      ) : (
        ''
      )}
      {/* {isFetching && <div className="bg-gray-500">로딩중...</div>} */}
      {isMadeGameOpen && !isLoading && <MadeGame games={games as gameType[]} refetch={refetch} likes={likes} />}
      {!isMadeGameOpen && <LikedGame games={gamesLiked as gameType[]} isFetching={isFetching} likes={likes} />}
    </div>
  );
};

export default MyGame;
