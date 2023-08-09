import React from 'react';
import { Link } from 'react-router-dom';

import { type Content } from 'pages';

const HotGames = ({ data }: { data: Content[] }) => {
  return (
    <>
      <h2 className="text-3xl">웹종겜 인기 순위 (TOP 3)</h2>
      <section className="box-container flex gap-5 between items-center mt-10 pb-16 border-b-2 border-black">
        {data.map(content => (
          <Link
            to={`/game/${content.category}/${content.gameId}`}
            key={content.date}
            className="box bg-skyBlue w-full h-[144px] rounded-lg p-3"
          >
            <p className="textgame">[이어말하기] {content.title}</p>
            <p className="total-quiz"> {content.quiz}문항</p>
            <p className="writer text-gray4 mt-6 text-sm">{content.writer}</p>
            <p className="date text-gray4 text-sm">
              {new Date(content.date).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
};

export default HotGames;
