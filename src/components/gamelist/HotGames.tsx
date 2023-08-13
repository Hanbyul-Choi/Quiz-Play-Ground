import React from 'react';
import { Link } from 'react-router-dom';

import like from 'assets/icons/LikeOutlined.svg';
import { categoryMatchKo } from 'pages';

import { type GameDataprops } from './GameLists';

const HotGames = ({ data, likes }: GameDataprops) => {
  if (data === undefined || likes === undefined) return;

  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-skyBlue">
          Popularity Ranking
        </h2>
        <h2 className="ml-2 font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-blue">TOP 3</h2>
      </div>
      <section className="flex items-center gap-5 pb-16 mt-10 box-container between">
        {data.length !== 0 ? (
          data.map(game => (
            <>
              {}
              <Link
                to={`/game/${game.category}/${game.postId}${game.topic !== null ? '?game=' + game.topic : ''}`}
                key={game.date}
                className="box relative border-2 border-black w-full h-[144px] flex-col justify-center rounded-lg p-3"
              >
                <p className="font-semibold textgame ">
                  [{categoryMatchKo[game.category]}]
                  {game.title.length > 10 ? game.title.slice(0, 10) + '....' : game.title}
                </p>
                <p className="mt-1 total-quiz"> {game.totalQuiz}문제</p>
                <p className="mt-6 text-sm writer text-gray4">{game.userName}</p>
                <p className="text-sm date text-gray4">
                  {new Date(game.date).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="absolute flex items-center gap-2 bottom-2 right-2">
                  <img src={like} />
                  {likes?.find(doc => doc.postId === game.postId)?.likeUsers.length ?? 0}
                </div>
              </Link>
            </>
          ))
        ) : (
          <div>아직 랭크된 게임이 없습니다.</div>
        )}
      </section>
    </>
  );
};

export default HotGames;
