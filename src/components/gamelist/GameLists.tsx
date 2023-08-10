import { Link } from 'react-router-dom';

import { type GameListContent } from 'pages';

type Match = Record<string, string>;

export const categoryMatch: Match = {
  relay: '이어 말하기',
  nonsensequiz: '넌센스 퀴즈',
  personquiz: '인물 퀴즈',
  mzwordsquiz: '신조어 퀴즈'
};

export const topicMatch: Match = {
  proverb: '속담',
  idiom: '사자성어',
  '4words': '일상단어'
};

const GameLists = ({ data }: { data: GameListContent[] }) => {
  // const marksvg = {
  //   mark: './assets/icons/BookMark.svg',
  //   marked: './assets/icons/BookMarked.svg'
  // };
  // const onClickMark () => {

  // }

  // 컴포넌트를 gameInfo로 컴포넌트 분리?

  return (
    <section className="game-list flex-col justify-center items-center mt-10">
      {data.map(game => (
        <div key={game.postId} className="game relative w-full h-[92px] border-b-[1px] border-gray4 mb-10">
          <Link to={`/game/${game.category}/${game.postId}${game.topic !== undefined ? '?game=' + game.topic : ''}`}>
            <div className=" text-gray4 text-sm">
              {game.userId} | {new Date(game.date).toLocaleString()}
            </div>
            <div className="mt-4 text-lg ">
              [{categoryMatch[game.category]}] {game.title} | {game.totalQuiz}문항{' '}
              {game.topic !== undefined ? `|  ${topicMatch[game.topic]}` : null}
            </div>
          </Link>
          <img
            // onClick={onClickMark}
            className="absolute top-0 right-0 cursor-pointer"
            src={'./assets/icons/BookMark.svg'}
            // src={game.isMarked ? marksvg.marked : marksvg.mark}
          />
          <div className="flex items-center gap-2 absolute bottom-2 right-2">
            <img src={'./assets/icons/LikeOutLined.svg'} className="cursor-pointer" />
            125
          </div>
        </div>
      ))}
    </section>
  );
};

export default GameLists;
