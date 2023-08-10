import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

import { getGameLists } from 'api/gameList';
import GameLists from 'components/gamelist/GameLists';
import HotGames from 'components/gamelist/HotGames';
import { Dropdown } from 'components/shared/Dropdown';

export interface GameListContent {
  postId: string;
  category: string;
  date: number;
  title: string;
  topic?: string;
  totalQuiz: number;
  userId: string;
}
export interface Content {
  title: string;
  quiz: number;
  writer: string;
  date: number;
  category: string;
  gameId: string;
  topic?: string;
}

export const dummy: Content[] = [
  {
    title: '예능게임',
    quiz: 20,
    writer: '익명의 눈사람',
    date: 1689067911504,
    category: 'relay',
    gameId: '123zbs45',
    topic: '속담'
  },
  {
    title: '사자성어 이어말하기',
    quiz: 20,
    writer: '익명의 눈사람',
    date: 1689067911511,
    category: 'relay',
    gameId: '123zbs25',
    topic: '사자성어'
  },
  {
    title: 'mz 도전!',
    quiz: 20,
    writer: '익명의 펭귄',
    date: 1689067911502,
    category: 'mzwordsquiz',
    gameId: '123zbs15'
  }
];

export const Main = () => {
  const params = useParams();
  const { category } = params;

  const { data } = useQuery('gameList', getGameLists);

  // const [gameLists, setGameList] = useState(data);

  const filterData = () => {
    if (data === undefined) return;
    let filteredData = data;

    if (category !== undefined) {
      filteredData = filteredData.filter(content => content.category === category);
      console.log(category, filteredData);
    }

    return filteredData;
  };

  const filteredData = filterData();
  // useEffect(() => {
  //   if (category !== undefined) {
  //     setGameList(data?.filter(game => game.category === category));
  //   }
  //   console.log(params, data);
  // }, [params]);

  if (filteredData === undefined) return;
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
        <Link to={'/main/mzwordsquiz'} className={category === 'mzwords' ? 'text-black' : ''}>
          신조어 퀴즈
        </Link>
      </div>
      <div className="filter flex items-center justify-end mt-7 gap-2">
        <p>(인기순 / 최신순)</p>
        <Dropdown
          options={['인기순', '최신순']}
          selected={1}
          border
          onChange={val => {
            console.log(val);
          }}
        />
      </div>
      {filteredData.length === 0 ? (
        <h2 className="text-2xl w-full text-center mt-10">
          현재 관련 게임이 없습니다. <br />
          <br />
          게임 제작에 참여해주세요.
        </h2>
      ) : (
        <GameLists data={filteredData} />
      )}
    </div>
  );
};
