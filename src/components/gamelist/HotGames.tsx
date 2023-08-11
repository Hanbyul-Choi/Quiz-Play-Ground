import React from 'react';
import { Link } from 'react-router-dom';

import { type Content } from 'pages';

import { categoryMatch } from './GameLists';

const HotGames = ({ data }: { data: Content[] }) => {
  return (
    <>
      <h2 className="text-3xl">웹종겜 인기 순위 (TOP 3)</h2>
      <section className="flex items-center gap-5 pb-16 mt-10 border-b-2 border-black box-container between">
        {data.map(game => (
          <Link
            to={`/game/${game.category}/${game.gameId}`}
            key={game.date}
            className="box relative bg-skyBlue w-full h-[144px] flex-col justify-center rounded-lg p-3"
          >
            <p className="textgame">
              [{categoryMatch[game.category]}] {game.title}
            </p>
            <p className="total-quiz"> {game.quiz}문제</p>
            <p className="mt-6 text-sm writer text-gray4">{game.writer}</p>
            <p className="text-sm date text-gray4">
              {new Date(game.date).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <img
              className="absolute top-0 right-0"
              src={'./assets/icons/BookMark.svg'}
              // src={game.isMarked ? marksvg.marked : marksvg.mark}
            />
            <div className="absolute flex items-center gap-2 bottom-2 right-2">
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
