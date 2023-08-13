import React from 'react';

import { type GameListContent } from 'pages';

import GameInfo, { type LikeDoc } from './GameInfo';

export interface GameDataprops {
  data: GameListContent[];
  likes: LikeDoc[];
}

const GameLists = ({ data, likes }: GameDataprops) => {
  if (likes === undefined || data === undefined) return null;
  const mergedData = data.map(game => {
    const likeDoc = likes.find(doc => doc.postId === game.postId);
    if (likeDoc === undefined) {
      return { ...game, likeDoc: null };
    }
    return { ...game, likeDoc };
  });
  return (
    <section className="flex flex-col items-center justify-center min-h-[20%] mt-2">
      {mergedData.map(game => (
        <GameInfo key={game.postId} game={game} />
      ))}
    </section>
  );
};

export default GameLists;
