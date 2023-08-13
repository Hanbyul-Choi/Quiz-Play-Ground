import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { Skeleton } from 'antd';
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

export const personTopicMatch: Match = {
  actor: '배우',
  singer: '가수',
  character: '캐릭터',
  greatman: '위인',
  sports: '운동선수',
  mix: '종합'
};

export const Main = () => {
  const [curCategory, setCurCategory] = useState<string>('');
  const [sortWay, setSortWay] = useState('인기순');
  const [filteredData, setFilteredData] = useState<GameListContent[]>([]);
  const [rankedGame, setRankedGame] = useState<GameListContent[]>([]);

  const { data, isLoading } = useQuery('gameList', getGameLists);
  const { data: likes } = useQuery('gameLike', getGameLikes);

  const handleCategoryClick = (category: string) => {
    setCurCategory(category);
  };

  useEffect(() => {
    // 인기순
    if (data !== undefined) {
      if (sortWay === '인기순') {
        const sortedCategoryData = sortCategory(data);

        if (sortedCategoryData !== undefined) {
          const sortedLikeData = sortLike(sortedCategoryData);
          setFilteredData(sortedLikeData);
          if (curCategory === '') setRankedGame([sortedLikeData[1], sortedLikeData[0], sortedLikeData[2]]);
        }
      } else {
        const sortedCategoryData = sortCategory(data);
        if (sortedCategoryData !== undefined) {
          setFilteredData(sortedCategoryData);
        }
      }
    }
  }, [sortWay, data, curCategory, likes]);

  const sortCategory = (games: GameListContent[]) => {
    // 카테고리 별
    if (data !== undefined) {
      if (curCategory !== '') {
        return games.filter(content => content.category === curCategory);
      }
      return games;
    }
  };

  const sortLike = (games: GameListContent[]) => {
    const copyData = [...games];
    if (likes !== undefined) {
      copyData.sort((a, b) => {
        const firstLike = likes.find(doc => doc.postId === a.postId)?.likeUsers.length ?? 0;
        const secondLike = likes.find(doc => doc.postId === b.postId)?.likeUsers.length ?? 0;
        return secondLike - firstLike;
      });
    }
    return copyData;
  };

  if (isLoading) {
    return (
      <>
        <div className="mt-7">
          <Skeleton title={false} active round />
        </div>
        <div className="mt-7">
          <Skeleton title={false} active round />
        </div>
        <div className="mt-7">
          <Skeleton title={false} active round />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex-col items-center justify-center">
        <HotGames data={rankedGame} likes={likes ?? []} />
        {/* 게임 카테고리 선택 */}
        <div className="category justify-center flex gap-[60px] text-lg text-gray3">
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
            {'현재 관련 게임이 없습니다.'}
            <br />
            <br />
            {'게임 제작에 참여해주세요.'}
          </h2>
        ) : (
          <div className="h-[500px] overflow-y-scroll">
            <GameLists data={filteredData} likes={likes ?? []} />
          </div>
        )}
      </div>
    </>
  );
};
