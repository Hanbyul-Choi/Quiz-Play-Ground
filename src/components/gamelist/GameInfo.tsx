import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { clickLike } from 'api/gameLikes';
import { useMount } from 'hooks';
import { categoryMatch, topicMatch, type GameListContent } from 'pages';

enum likesvg {
  liked = './assets/icons/Liked.svg',
  like = './assets/icons/LikeOutLined.svg'
}

export interface LikeDoc {
  postId: string;
  likeUsers: string[];
}

interface GameinfoProps extends GameListContent {
  likeDoc: LikeDoc | null;
}

const GameInfo = ({ game }: { game: GameinfoProps }) => {
  const { category, title, topic, userId, likeDoc, postId } = game;
  // TODO: 실제 로그인한 user uid로 변경 필요.
  const curUser = 'test2';
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const clickLikeMutation = useMutation(
    async () => {
      await clickLike(postId, curUser);
    },
    {
      // onSuccess: async () => {
      //   await queryClient.invalidateQueries('gameLike');
      // }
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: 'gameLike' });

        const prevGameLike: LikeDoc[] | undefined = queryClient.getQueryData('gameLike');

        if (prevGameLike === undefined) return;
        const updatedGameLike = prevGameLike.map((likeDoc: LikeDoc) => {
          if (likeDoc.postId === postId) {
            if (likeDoc.likeUsers.includes(curUser)) {
              // 이미 좋아요한 경우 좋아요 취소  TODO: 문서자체가 없을 때도 처리 필요.
              return {
                ...likeDoc,
                likeUsers: likeDoc.likeUsers.filter(id => id !== curUser)
              };
            } else {
              // 좋아요 추가
              return {
                ...likeDoc,
                likeUsers: [...likeDoc.likeUsers, curUser]
              };
            }
          }
          return likeDoc;
        });

        queryClient.setQueryData('gameLike', updatedGameLike);

        return { prevGameLike };
      },
      onError: (err, variables, context) => {
        console.log(err);
        if (context === undefined) return;
        queryClient.setQueryData<LikeDoc[]>(['gameLike'], context.prevGameLike);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: 'gameLike' });
      }
    }
  );

  const onClickLike = () => {
    setIsLiked(prev => !prev);
    clickLikeMutation.mutate();
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
        {likeDoc?.likeUsers.length ?? 0}
      </div>
    </div>
  );
};

export default GameInfo;
