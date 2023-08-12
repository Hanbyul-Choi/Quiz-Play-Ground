import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getGameLikes } from 'api/gameLikes';
import { getGameLists } from 'api/gameList';
import GameLists from 'components/gamelist/GameLists';
import HotGames from 'components/gamelist/HotGames';
import { Dropdown } from 'components/shared/Dropdown';

export interface GameListContent {
  postId: string;
  category: string;
  date: string;
  title: string;
  topic: string | null;
  totalQuiz: number;
  userId: string;
  userName: string;
}

type Match = Record<string, string>;

export const categoryMatchKo: Match = {
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

export const Main = () => {
  const [curCategory, setCurCategory] = useState<string>('');

  const { data } = useQuery('gameList', getGameLists);
  const { data: likes } = useQuery('gameLike', getGameLikes);
  const [sortWay, setSortWay] = useState('인기순');
  const [filteredData, setFilteredData] = useState<GameListContent[]>();

  const handleCategoryClick = (category: string) => {
    setCurCategory(category);
  };
  useEffect(() => {
    setFilteredData(filterData());
  }, [curCategory, sortWay]);

  const filterData = (): GameListContent[] | undefined => {
    if (data === undefined) return;
    let filteredData = data;

    if (curCategory !== '') {
      filteredData = filteredData.filter(content => content.category === curCategory);
      console.log(1, curCategory, filteredData);
    }
    if (sortWay === '인기순') {
      filteredData.sort((a, b) => {
        const firstLike = likes?.find(doc => doc.postId === a.postId)?.likeUsers.length ?? 0;
        const secondLike = likes?.find(doc => doc.postId === b.postId)?.likeUsers.length ?? 0;
        if (firstLike > secondLike) return -1;
        if (firstLike < secondLike) return 1;
        else return 0;
      });
    } else if (sortWay === '최신순') {
      filteredData.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        else return 0;
      });
    }
    return filteredData;
  };

  if (filteredData === undefined || data === undefined || likes === undefined) return;

  const topGame = [filteredData[0], filteredData[1], filteredData[2]];

  return (
    <div className="flex-col items-center justify-center p-5">
      <HotGames data={topGame} likes={likes} />
      <div className="category justify-center flex gap-[60px] mt-10 text-lg text-gray3">
        <button
          onClick={() => {
            handleCategoryClick('');
          }}
          className={curCategory === '' ? 'text-black' : ''}
        >
          전체
        </button>
        <button
          onClick={() => {
            handleCategoryClick('relay');
          }}
          className={curCategory === 'relay' ? 'text-black' : ''}
        >
          이어 말하기
        </button>
        <button
          onClick={() => {
            handleCategoryClick('nonsensequiz');
          }}
          className={curCategory === 'nonsensequiz' ? 'text-black' : ''}
        >
          넌센스 퀴즈
        </button>
        <button
          onClick={() => {
            handleCategoryClick('personquiz');
          }}
          className={curCategory === 'personquiz' ? 'text-black' : ''}
        >
          인물 퀴즈
        </button>
        <button
          onClick={() => {
            handleCategoryClick('mzwordsquiz');
          }}
          className={curCategory === 'mzwordsquiz' ? 'text-black' : ''}
        >
          신조어 퀴즈
        </button>
      </div>
      <div className="flex items-center justify-end gap-2 filter mt-7">
        <p>(인기순 / 최신순)</p>
        <Dropdown
          options={['인기순', '최신순']}
          selected={1}
          border
          onChange={val => {
            setSortWay(val);
          }}
        />
      </div>
      {filteredData.length === 0 ? (
        <h2 className="w-full mt-10 text-2xl text-center">
          현재 관련 게임이 없습니다. <br />
          <br />
          게임 제작에 참여해주세요.
        </h2>
      ) : (
        <div className="h-[50vh] overflow-y-scroll">
          <GameLists data={filteredData} likes={likes} />
        </div>
      )}
    </div>
  );
};
