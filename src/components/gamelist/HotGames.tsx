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
      <section className="flex items-end justify-center gap-20 pb-10 mt-2 box-container">
        {data.length !== 0 ? (
          data.map((game, index) => (
            <>
              {index === 0 ? (
                <div
                  key={game.postId}
                  className="relative w-[250px] h-[320px] p-2 border-2 border-black bg-white rounded-[10px] hover:bg-gray1 "
                >
                  <Link
                    to={`/game/${game.category}/${game.postId}${game.topic !== null ? '?game=' + game.topic : ''}`}
                    className="relative flex flex-col items-center justify-center gap-[3px] rounded-lg "
                  >
                    <p className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-7xl text-green">2</p>
                    <div className="flex items-center gap-2 mt-2 ">
                      <img src={like} className="scale-125" />
                      <h2 className="text-4xl font-bold">
                        {likes?.find(doc => doc.postId === game.postId)?.likeUsers.length ?? 0}
                      </h2>
                    </div>
                    <p className="font-semibold text-center ">
                      [{categoryMatchKo[game.category]}]<br />
                      <br />
                      {game.title.length > 10 ? game.title.slice(0, 10) + '....' : game.title}
                    </p>
                    <p className="font-bold"> {game.totalQuiz} 문항</p>
                    <p className="mt-4 text-sm text-gray4">작성자 - {game.userName}</p>
                    <p className="text-sm text-gray4">
                      {new Date(game.date).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </Link>
                  <div className="absolute z-[-10] top-2 left-2 w-[250px] h-[320px] border-b-[14px] border-r-[14px] border-green rounded-[10px] " />
                </div>
              ) : index === 1 ? (
                <div
                  key={game.date}
                  className="relative w-[280px] h-[360px] p-2 border-2 border-black bg-white rounded-[10px]  hover:bg-gray1 "
                >
                  <Link
                    to={`/game/${game.category}/${game.postId}${game.topic !== null ? '?game=' + game.topic : ''}`}
                    className="relative flex flex-col items-center justify-center gap-1 rounded-lg"
                  >
                    <p className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-8xl text-red">1</p>
                    <div className="flex items-center gap-2 mt-2 ">
                      <img src={like} className="scale-125" />
                      <h2 className="text-4xl font-bold">
                        {likes?.find(doc => doc.postId === game.postId)?.likeUsers.length ?? 0}
                      </h2>
                    </div>
                    <p className="font-semibold text-center ">
                      [{categoryMatchKo[game.category]}]<br />
                      <br />
                      {game.title.length > 10 ? game.title.slice(0, 10) + '....' : game.title}
                    </p>
                    <p className="font-bold"> {game.totalQuiz} 문항</p>
                    <p className="mt-4 text-sm text-gray4">작성자 - {game.userName}</p>
                    <p className="text-sm text-gray4">
                      {new Date(game.date).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </Link>
                  <div className="absolute z-[-10] top-2 left-2 w-[280px] h-[360px] border-b-[14px] border-r-[14px] border-red rounded-[10px]" />
                </div>
              ) : (
                <div
                  key={game.date}
                  className="relative w-[250px] h-[300px] p-2 border-2 border-black bg-white rounded-[10px]  hover:bg-gray1 "
                >
                  <Link
                    to={`/game/${game.category}/${game.postId}${game.topic !== null ? '?game=' + game.topic : ''}`}
                    className="relative flex flex-col items-center justify-center gap-[2px] rounded-lg"
                  >
                    <p className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-6xl text-yellow">3</p>
                    <div className="flex items-center gap-2 mt-2 ">
                      <img src={like} className="scale-125" />
                      <h2 className="text-4xl font-bold">
                        {likes?.find(doc => doc.postId === game.postId)?.likeUsers.length ?? 0}
                      </h2>
                    </div>
                    <p className="font-semibold text-center ">
                      [{categoryMatchKo[game.category]}]<br />
                      <br />
                      {game.title.length > 10 ? game.title.slice(0, 10) + '....' : game.title}
                    </p>
                    <p className="font-bold"> {game.totalQuiz} 문항</p>
                    <p className="mt-4 text-sm text-gray4">작성자 - {game.userName}</p>
                    <p className="text-sm text-gray4">
                      {new Date(game.date).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </Link>
                  <div className="absolute z-[-10] top-2 left-2 w-[250px] h-[300px] border-b-[14px] border-r-[14px] border-yellow rounded-[10px]" />
                </div>
              )}
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
