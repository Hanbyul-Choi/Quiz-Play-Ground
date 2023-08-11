import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

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

  const { data: games, isLoading, refetch } = useQuery('GameLists', async () => await getMadeGames(userId as string));
  useEffect(() => {
    if (!isLoading && games !== undefined) {
      void refetch();
    }
  }, [isLoading, games]);

  const {
    data: gamesId,
    isLoading: isGamesIdLoading,
    refetch: gamesIdRefetch
  } = useQuery('GameLikes', async () => await getLikedGamesId(userId as string));
  const {
    data: gamesLiked,
    isLoading: isGameLikedLoading,
    refetch: refetchGamesLiked
  } = useQuery('LikedGameLists', async () => await getLikedGames(gamesId as gameType[]));

  useEffect(() => {
    if (!isGameLikedLoading && gamesId !== undefined && !isGamesIdLoading) {
      void gamesIdRefetch();
      void refetchGamesLiked();
    }
  }, [isGameLikedLoading, gamesId, isGamesIdLoading]);

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

      {isMadeGameOpen && !isLoading && <MadeGame games={games as gameType[]} isLoading={isLoading} refetch={refetch} />}
      {!isMadeGameOpen && <LikedGame gamesId={gamesId} games={gamesLiked as gameType[]} />}
    </div>
  );
};

export default MyGame;
