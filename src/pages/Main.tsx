import { useState } from 'react';
import { useQuery } from 'react-query';

import { getGameLikes } from 'api/gameLikes';
import { getGameLists } from 'api/gameList';
import GameLists from 'components/gamelist/GameLists';
import HotGames from 'components/gamelist/HotGames';
import { Dropdown } from 'components/shared/Dropdown';

export interface GameListContent {
  postId: string;
  category: string;
  date: number;
  title: string;
  topic: string | null;
  totalQuiz: number;
  userId: string;
}

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

export const Main = () => {
  const [curCategory, setCurCategory] = useState('');

  const { data } = useQuery('gameList', getGameLists);
  const { data: likes } = useQuery('gameLike', getGameLikes);

  const filterData = () => {
    if (data === undefined) return;
    let filteredData = data;

    if (curCategory !== '') {
      filteredData = filteredData.filter(content => content.category === curCategory);
    }
    return filteredData;
  };

  const handleCategoryClick = (category: string) => {
    setCurCategory(category);
  };

  const filteredData = filterData();

  if (filteredData === undefined || data === undefined || likes === undefined) return;

  const topGame = [data[0], data[1], data[2]];

  return (
    <div className="flex-col items-center justify-center p-5">
      <HotGames data={topGame} />
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
            handleCategoryClick('nonsense');
          }}
          className={curCategory === 'nonsense' ? 'text-black' : ''}
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
        <GameLists data={filteredData} likes={likes} />
      )}
    </div>
  );
};
