import { Link, useParams } from 'react-router-dom';

import GameLists from 'components/gamelist/GameLists';
import HotGames from 'components/gamelist/HotGames';
import { Dropdown } from 'components/shared/Dropdown';

export interface Content {
  title: string;
  quiz: number;
  writer: string;
  date: number;
  category: string;
  gameId: string;
}

export const dummy: Content[] = [
  {
    title: '예능게임',
    quiz: 20,
    writer: '익명의 눈사람',
    date: 1689067911504,
    category: 'relay',
    gameId: '123zbs45'
  },
  {
    title: '예능게임',
    quiz: 20,
    writer: '익명의 츤데레',
    date: 1689067911511,
    category: 'relay',
    gameId: '123zbs25'
  },
  {
    title: '예능게임',
    quiz: 20,
    writer: '익명의 눈사람',
    date: 1689067911502,
    category: 'relay',
    gameId: '123zbs15'
  }
];

export const Main = () => {
  const params = useParams();

  const { category } = params;
  console.log(category);

  return (
    <div className="flex-col items-center justify-center p-5">
      <HotGames data={dummy} />
      <div className="category justify-center flex gap-[60px] mt-10 text-lg text-gray3">
        <Link to={'/main'} className={category === undefined ? 'text-black' : ''}>
          전체
        </Link>
        <Link to={'/main/relay'} className={category === 'relay' ? 'text-black' : ''}>
          이어 말하기
        </Link>
        <Link to={'/main/nonsense'} className={category === 'nonsense' ? 'text-black' : ''}>
          넌센스 퀴즈
        </Link>
        <Link to={'/main/personquiz'} className={category === 'personquiz' ? 'text-black' : ''}>
          인물 퀴즈
        </Link>
        <Link to={'/main/mzwords'} className={category === 'mzwords' ? 'text-black' : ''}>
          신조어 퀴즈
        </Link>
      </div>
      <div className="filter flex items-center justify-end mt-7 gap-2">
        <p>(인기순 / 최신순)</p>
        <Dropdown
          options={['인기순', '최신순']}
          selected={1}
          onChange={val => {
            console.log(val);
          }}
        />
      </div>
      <GameLists />
    </div>
  );
};
