import { Link } from 'react-router-dom';

import { type Content } from 'pages';

type humanInfo = Record<string, string>;

export const categoryMatch: humanInfo = {
  relay: '이어 말하기',
  nonsensequiz: '넌센스 퀴즈',
  personquiz: '인물 퀴즈',
  mzwordsquiz: '신조어 퀴즈'
};

const GameLists = ({ data }: { data: Content[] }) => {
  // const marksvg = {
  //   mark: './assets/icons/BookMark.svg',
  //   marked: './assets/icons/BookMarked.svg'
  // };
  // const onClickMark () => {

  // }

  return (
    <section className="game-list flex-col justify-center items-center mt-10">
      {data.map(game => (
        <div key={game.gameId} className="game relative w-full h-[92px] border-b-[1px] border-gray4 mb-10">
          <Link to={`/game/relay/asda`}>
            <div className=" text-gray4 text-sm">
              {game.writer} | {new Date(game.date).toLocaleString()}
            </div>
            <div className="mt-4 text-lg ">
              [{categoryMatch[game.category]}] {game.title} | {game.quiz}문항{' '}
              {game.topic !== undefined ? `|  ${game.topic}` : null}
            </div>
          </Link>
          <img
            // onClick={onClickMark}
            className="absolute top-0 right-0"
            src={'./assets/icons/BookMark.svg'}
            // src={game.isMarked ? marksvg.marked : marksvg.mark}
          />
          <div className="flex items-center gap-2 absolute bottom-2 right-2">
            <img src={'./assets/icons/LikeOutLined.svg'} />
            125
          </div>
        </div>
      ))}
    </section>
  );
};

export default GameLists;
