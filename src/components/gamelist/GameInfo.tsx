import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMount } from 'hooks';
import { categoryMatch, topicMatch, type GameListContent } from 'pages';

const likesvg = {
  liked: './assets/icons/Liked.svg',
  like: './assets/icons/LikeOutLined.svg'
};

export interface LikeDoc {
  postId: string;
  likeUsers: string[];
}

interface GameinfoProps extends GameListContent {
  likeDoc: LikeDoc | null;
}

const GameInfo = ({ game }: { game: GameinfoProps }) => {
  const { category, title, topic, userId, likeDoc } = game;
  const curUser = 'test2';
  const [isLiked, setIsLiked] = useState(false);
  const onClickLike = () => {
    setIsLiked(prev => !prev);
  };
  useMount(() => {
    if (likeDoc?.likeUsers.includes(curUser) as boolean) {
      setIsLiked(true);
    }
  });

  return (
    <div className="game relative w-full h-[92px] border-b-[1px] border-gray4 mb-10">
      <Link to={`/game/${category}/${game.postId}${topic !== null ? '?game=' + topic : ''}`}>
        <div className=" text-gray4 text-sm">
          {userId} | {new Date(game.date).toLocaleString()}
        </div>
        <div className="mt-4 text-lg ">
          [{categoryMatch[category]}] {title} | {game.totalQuiz}문항 {topic !== null ? `|  ${topicMatch[topic]}` : null}
        </div>
      </Link>
      <img
        // onClick={onClickMark}
        className="absolute top-0 right-0 cursor-pointer"
        src={'./assets/icons/BookMark.svg'}
        // src={game.isMarked ? marksvg.marked : marksvg.mark}
      />
      <div className="flex items-center gap-2 absolute bottom-2 right-2">
        <img
          onClick={onClickLike}
          src={isLiked ? likesvg.liked : likesvg.like}
          className="cursor-pointer hover:scale-110"
        />
        {likeDoc?.likeUsers.length}
      </div>
    </div>
  );
};

export default GameInfo;
