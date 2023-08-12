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
  const [sortWay, setSortWay] = useState('인기순');
  const [filteredData, setFilteredData] = useState<GameListContent[]>();
  const [rankedGame, setRankedGame] = useState<GameListContent[]>();

  const { data } = useQuery('gameList', getGameLists);
  const { data: likes } = useQuery('gameLike', getGameLikes);

  const handleCategoryClick = (category: string) => {
    setCurCategory(category);
  };

  useEffect(() => {
    // 데이터 정렬 및 필터링
    const sortedData = filterData();
    setFilteredData(sortedData);
    if (curCategory === '' && sortWay === '인기순') setRankedGame(sortedData?.slice(0, 3));
  }, [curCategory, sortWay, filteredData]);

  // 데이터 정렬
  const filterData = (): GameListContent[] | undefined => {
    if (data === undefined || likes === undefined) return;
    let filteredData = data;
    if (curCategory !== '') {
      filteredData = data.filter(content => content.category === curCategory);
    }

    if (sortWay === '인기순') {
      filteredData.sort((a, b) => {
        const firstLike = likes.find(doc => doc.postId === a.postId)?.likeUsers.length ?? 0;
        const secondLike = likes.find(doc => doc.postId === b.postId)?.likeUsers.length ?? 0;
        return secondLike - firstLike;
      });
    } else if (sortWay === '최신순') {
      filteredData.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
    }
    return filteredData;
  };

  if (filteredData === undefined || data === undefined || likes === undefined || rankedGame === undefined) return;

  return (
    <div className="flex-col items-center justify-center p-5">
      {/* 인기게임 top 3 */}
      <HotGames data={rankedGame.slice(0, 3)} likes={likes} />

      {/* 게임 카테고리 선택 */}
      <div className="category justify-center flex gap-[60px] mt-10 text-lg text-gray3">
        <button
          onClick={() => {
            handleCategoryClick('');
          }}
          className={curCategory === '' ? 'text-black underline' : ''}
        >
          전체
        </button>
        <button
          onClick={() => {
            handleCategoryClick('relay');
          }}
          className={curCategory === 'relay' ? 'text-black underline' : ''}
        >
          이어 말하기
        </button>
        <button
          onClick={() => {
            handleCategoryClick('nonsensequiz');
          }}
          className={curCategory === 'nonsensequiz' ? 'text-black underline' : ''}
        >
          넌센스 퀴즈
        </button>
        <button
          onClick={() => {
            handleCategoryClick('personquiz');
          }}
          className={curCategory === 'personquiz' ? 'text-black underline' : ''}
        >
          인물 퀴즈
        </button>
        <button
          onClick={() => {
            handleCategoryClick('mzwordsquiz');
          }}
          className={curCategory === 'mzwordsquiz' ? 'text-black underline' : ''}
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
            setSortWay(() => val);
          }}
        />
      </div>

      {/* 게임 리스트 */}
      {filteredData.length === 0 ? (
        <h2 className="w-full mt-10 text-2xl text-center">
          {curCategory !== 'personquiz' ? '현재 관련 게임이 없습니다.' : '인물퀴즈는 업데이트 예정입니다.'}
          <br />
          <br />
          {curCategory !== 'personquiz' ? '게임 제작에 참여해주세요.' : '조금만 기다려 주세요.'}
        </h2>
      ) : (
        <div className="h-[50vh] overflow-y-scroll">
          <GameLists data={filteredData} likes={likes} />
        </div>
      )}
    </div>
  );
};
