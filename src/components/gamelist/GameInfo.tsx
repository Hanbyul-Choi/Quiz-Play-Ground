/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { getUsers } from 'api/auth';
import { clickLike } from 'api/gameLikes';
import liked from 'assets/icons/Liked.svg';
import like from 'assets/icons/LikeOutlined.svg';
import { useDialog } from 'components/shared/Dialog';
import { topicMatch, type GameListContent, categoryMatchKo, personTopicMatch } from 'pages';
import { userStore } from 'store';

export interface LikeDoc {
  postId: string;
  likeUsers: string[];
}

interface GameinfoProps extends GameListContent {
  likeDoc: LikeDoc | null;
}

const GameInfo = ({ game }: { game: GameinfoProps }) => {
  const { category, title, topic, userId, likeDoc, postId } = game;
  const { userId: curUser } = userStore();
  const { Alert } = useDialog();
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();
  const { data: users } = useQuery('users', getUsers);
  const clickLikeMutation = useMutation(
    async () => {
      if (curUser === null) return;
      await clickLike(postId, curUser);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: 'gameLike' });

        const prevGameLike: LikeDoc[] | undefined = queryClient.getQueryData('gameLike');

        if (prevGameLike === undefined) return;
        const updatedGameLike = prevGameLike.map((likeDoc: LikeDoc) => {
          if (likeDoc.postId === postId && curUser !== null) {
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
      onError: (_, __, context) => {
        if (context === undefined) return;
        queryClient.setQueryData<LikeDoc[]>(['gameLike'], context.prevGameLike);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: 'gameLike' });
        await queryClient.invalidateQueries({ queryKey: 'GameLikes' });
        await queryClient.invalidateQueries({ queryKey: 'LikedGameLists' });
      }
    }
  );

  const onClickLike = async (): Promise<void> => {
    if (curUser === null) {
      await Alert('로그인 후 이용 가능합니다.');
      return;
    }
    clickLikeMutation.mutate();
    setIsLiked(prev => !prev);
  };

  useEffect(() => {
    if (curUser === null) return;
    if (likeDoc?.likeUsers.includes(curUser) as boolean) {
      setIsLiked(true);
    }
  }, [curUser]);

  return (
    <div className="relative bg-white rounded-[10px] w-[940px] mb-10">
      <div className="relative w-[100%] h-[92px] p-2 border-2 border-black bg-white rounded-[10px]">
        <Link to={`/game/${category}/${game.postId}${topic !== null ? '?game=' + topic : ''}`}>
          <div className="text-sm text-gray4">
            {users?.find(user => user.userId === userId)?.userName} · {new Date(game.date).toLocaleString()}
          </div>
          <div className="mt-4 text-lg ">
            <span className="font-bold">[{categoryMatchKo[category]}] </span>
            &nbsp; {title} &nbsp; <span className="font-extrabold">-</span> &nbsp; {game.totalQuiz}문항
            {topic !== null
              ? category === 'relay'
                ? ` (   ${topicMatch[topic]} )`
                : `  (   ${personTopicMatch[topic]} )`
              : null}
          </div>
        </Link>
        <div className="absolute flex items-center gap-2 bottom-2 right-2">
          <img onClick={onClickLike} src={isLiked ? liked : like} className="cursor-pointer hover:scale-110" />
          {likeDoc?.likeUsers.length ?? 0}
        </div>
      </div>
      <div className="absolute z-[-10] top-1 left-1 w-[100%] h-[92px] border-b-[10px] border-r-[10px] border-skyBlue rounded-[10px]" />
    </div>
  );
};

export default GameInfo;
