import React from 'react';
import { Link } from 'react-router-dom';

import { categoryMatch, type GameListContent } from 'pages';

const HotGames = ({ data }: { data: GameListContent[] }) => {
  return (
    <>
      <h2 className="text-3xl">웹종겜 인기 순위 (TOP 3)</h2>
      <section className="flex items-center gap-5 pb-16 mt-10 border-b-2 border-black box-container between">
        {data.map(game => (
          <Link
            to={`/game/${game.category}/${game.postId}`}
            key={game.date}
            className="box relative bg-skyBlue w-full h-[144px] flex-col justify-center rounded-lg p-3"
          >
            <p className="textgame">
              [{categoryMatch[game.category]}] {game.title}
            </p>
            <p className="total-quiz"> {game.totalQuiz}문제</p>
            <p className="writer text-gray4 mt-6 text-sm">{game.userId}</p>
            <p className="date text-gray4 text-sm">
              {new Date(game.date).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <img
              className="absolute top-0 right-1"
              src={'./assets/icons/BookMark.svg'}
              // src={game.isMarked ? marksvg.marked : marksvg.mark}
            />
            <div className="flex items-center gap-2 absolute bottom-4 right-2">
              <img src={'./assets/icons/LikeOutLined.svg'} />
              125
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default HotGames;
