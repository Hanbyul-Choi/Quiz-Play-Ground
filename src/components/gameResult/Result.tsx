/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';

import { clickLike, getGameLikes } from 'api/gameLikes';
import liked from 'assets/icons/Liked.svg';
import like from 'assets/icons/LikeOutlined.svg';
import { type LikeDoc } from 'components/gamelist/GameInfo';
import { useDialog } from 'components/shared/Dialog';
import { useMount } from 'hooks';
import { gameResultStore, userStore } from 'store';

const Result = () => {
  const { postid } = useParams();
  const { score, totalQuiz } = gameResultStore();
  const { userId: curUser } = userStore();
  const { data } = useQuery('gameLike', getGameLikes);
  const queryClient = useQueryClient();
  const { Alert } = useDialog();

  const likeDoc = data?.filter(likeDoc => likeDoc.postId === postid)[0] ?? null;

  const [isLiked, setIsLiked] = useState(false);

  const clickLikeMutation = useMutation(
    async () => {
      if (curUser === null) return;
      if (postid === undefined) return;
      await clickLike(postid, curUser);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: 'gameLike' });

        const prevGameLike: LikeDoc[] | undefined = queryClient.getQueryData('gameLike');

        if (prevGameLike === undefined) return;

        const updatedGameLike = prevGameLike.map((likeDoc: LikeDoc) => {
          if (likeDoc.postId === postid && curUser !== null) {
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

  const onClickLike = async (): Promise<void> => {
    if (curUser === null) {
      await Alert('로그인 후 이용 가능합니다.');
      return;
    }
    setIsLiked(prev => !prev);
    clickLikeMutation.mutate();
  };

  useMount(() => {
    if (curUser === null) return;
    if (likeDoc?.likeUsers.includes(curUser) as boolean) {
      setIsLiked(true);
    }
  });

  const ratecal = (score / totalQuiz) * 100;
  console.log(score);
  let rate = '';
  if (ratecal === 100) {
    rate = 'w-[100%]';
  } else if (ratecal > 89) {
    rate = 'w-[90%]';
  } else if (ratecal > 69) {
    rate = 'w-[70%]';
  } else if (ratecal > 59) {
    rate = 'w-[60%]';
  } else if (ratecal > 49) {
    rate = 'w-[50%]';
  } else if (ratecal > 39) {
    rate = 'w-[40%]';
  } else if (ratecal > 29) {
    rate = 'w-[30%]';
  } else if (ratecal > 19) {
    rate = 'w-[20%]';
  } else if (ratecal > 9) {
    rate = 'w-[10%]';
  } else {
    rate = 'w-[0%]';
  }

  return (
    <div className="flex flex-col items-center ">
      <p className="font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-skyBlue">게임결과</p>
      <div className="relative bg-white rounded-[10px]">
        <div className=" flex flex-col justify-center items-center w-[450px] h-[500px] border-[2px] border-black rounded-[10px]">
          <p className="mb-16 text-[20px] ">선택한 제한시간: 3초</p>
          <div className="border-[2px] border-black w-[350px] h-7 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-gray2 mb-16">
            <div className={`${rate} h-full bg-green`}></div>
          </div>
          <p className="mb-4 text-[18px]">{score}문제를 맞추셨군요!</p>
          <Link to={'/main'}>
            <p className="text-[18px]">다른 게임에도 도전해보세요. Click !</p>
          </Link>
          <div className="absolute flex items-center gap-2 bottom-4 right-4">
            <button onClick={onClickLike}>
              <img src={isLiked ? liked : like} alt="like" />
            </button>
            {likeDoc?.likeUsers.length ?? 0}
          </div>
        </div>
        <div className="absolute z-[-10] top-2 left-2 w-[450px] h-[500px] border-b-[12px] border-r-[12px] border-skyBlue rounded-[10px]" />
      </div>
    </div>
  );
};

export default Result;
