/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getUsers } from 'api/auth';
import { type gameType } from 'api/myGame';
import { type LikeDoc } from 'components/gamelist/GameInfo';
import { categoryMatchKo, topicMatch } from 'pages';

interface propsType {
  games: gameType[];
  isLoading?: boolean;
  refetch: any;
  likes: LikeDoc[] | undefined;
}
const MadeGame = ({ games, refetch, likes }: propsType) => {
  useEffect(() => {
    void refetch();
  }, []);

  const { data: users } = useQuery('users', getUsers);

  return (
    <ul className="w-[450px] mt-4 flex flex-col h-[calc(62vh-102px)] overflow-y-scroll">
      {games?.map((game, index) => {
        return (
          <div key={index} className="relative rounded-[10px] w-[420px] mb-5">
            <div className="relative w-[420px] h-[100px] p-2 border-2 border-black bg-white rounded-[10px]">
              <Link
                to={`/game/${game.category}/${game.postId}${game.topic !== null ? `?game=${game.topic}` : ''}`}
                className="border-b border-gray3"
              >
                <li>
                  <div className="flex mb-3 felx-row">
                    <p className="mt-1 pl-1 text-gray4 text-[12px]">
                      {users?.find(user => user.userId === game.userId)?.userName}
                    </p>
                    <p className="mt-1 pl-1 text-gray4 text-[12px]">|</p>
                    <p className="mt-1 pl-1 text-gray4 text-[12px]">{new Date(Number(game.date)).toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="w-[350px] mt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      [{game.category !== undefined && categoryMatchKo[game.category]}] {game.title} | {game.totalQuiz}
                      문항
                      {game.topic != null && ` | ${topicMatch[game.topic]}`}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <button>
                        <img src={'./assets/SmallLikeOutlined.svg'} alt="like" />
                      </button>
                      <p>
                        {likes?.filter(like => like.postId === game.postId)[0]?.likeUsers.length !== undefined
                          ? likes?.filter(like => like.postId === game.postId)[0]?.likeUsers.length
                          : 0}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            </div>
            <div className="absolute z-[-10] top-1 left-1 w-[420px] h-[100px] border-b-[10px] border-r-[10px] border-skyBlue rounded-[10px]" />
          </div>
        );
      })}
    </ul>
  );
};

export default MadeGame;
