import { type GameListContent } from 'pages';

import GameInfo, { type LikeDoc } from './GameInfo';

export interface GameDataprops {
  data: GameListContent[];
  likes: LikeDoc[];
}

const GameLists = ({ data, likes }: GameDataprops) => {
  if (likes === undefined) return;
  const mergedData = data.map(game => {
    const likeDoc = likes.find((doc: any) => doc.postId === game.postId);
    if (likeDoc === undefined) {
      return { ...game, likeDoc: null };
    }
    return { ...game, likeDoc };
  });
  return (
    <section className="flex-col items-center justify-center mt-10 overflow-y-scroll game-list ">
      {mergedData.map(game => (
        <GameInfo key={game.postId} game={game} />
      ))}
    </section>
  );
};

export default GameLists;
