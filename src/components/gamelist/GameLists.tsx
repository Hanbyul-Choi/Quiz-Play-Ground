import { type GameListContent } from 'pages';

import GameInfo, { type LikeDoc } from './GameInfo';

const GameLists = ({ data, likes }: { data: GameListContent[]; likes: LikeDoc[] }) => {
  if (likes === undefined) return;
  console.log(likes);
  const mergedData = data.map(game => {
    const likeDoc = likes.find((doc: any) => doc.postId === game.postId);
    if (likeDoc === undefined) {
      return { ...game, likeDoc: null };
    }
    return { ...game, likeDoc };
  });
  return (
    <section className="game-list flex-col justify-center items-center mt-10">
      {mergedData.map(game => (
        <GameInfo key={game.postId} game={game} />
      ))}
    </section>
  );
};

export default GameLists;
