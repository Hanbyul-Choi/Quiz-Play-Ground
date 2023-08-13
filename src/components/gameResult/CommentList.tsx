import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { Skeleton } from 'antd';
import { addComment, getComments, getTotalCommentCount } from 'api/comments';
import { Input } from 'components/shared';
import Button from 'components/shared/Button';
import { auth } from 'config/firebase';

import Comment from './Comment';

type RouteParams = Record<string, string | undefined>;

const CommentList = () => {
  const params = useParams<RouteParams>();
  const postId: string = params.postid ?? '';

  const queryClient = useQueryClient();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['gameResultComment', postId],
    async ({ pageParam = undefined }) => await getComments(postId, pageParam),
    {
      getNextPageParam: lastPage => {
        if (lastPage.length === 0) return undefined;
        return lastPage[lastPage.length - 1].date;
      }
    }
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage === true) {
      void fetchNextPage().catch(error => {
        console.error('다음 페이지를 fetching 하는데 error 발생', error);
      });
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const mutationAddComment = useMutation(addComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gameResultComment'] });
      await queryClient.invalidateQueries({ queryKey: ['totalComments', postId] });
      setValue('');
    },
    onError: error => {
      alert(error);
    }
  });

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') return;
    mutationAddComment.mutate({ postId, content: value });
  };

  const { data: totalCommentCount } = useQuery(
    ['totalComments', postId],
    async () => await getTotalCommentCount(postId)
  );

  if (isLoading)
    return (
      <div className="w-[500px] mt-24 ml-10 text-center flex flex-col justify-center gap-y-10">
        <Skeleton title={false} active round />
        <Skeleton title={false} active round />
        <Skeleton title={false} active round />
        <Skeleton title={false} active round />
        <Skeleton title={false} active round />
      </div>
    );

  return (
    <>
      <div className="flex flex-col ml-10">
        <div className="flex items-center justify-center pb-2 ">
          <p className="font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-skyBlue">댓글</p>
          <p className="ml-2 font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-yellow">
            {totalCommentCount}
          </p>
        </div>

        <div className="mt-2">
          {isLogin ? (
            <form className="flex gap-3" onSubmit={handleAddComment}>
              <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Input
                  border={true}
                  inputStyleType="comment"
                  inputType="text"
                  holderMsg="댓글을 입력해주세요!"
                  name="commentInput"
                  value={value}
                  onChange={e => {
                    setValue(e.target.value);
                  }}
                />
              </div>
              <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Button buttonStyle="yellow xs" type="submit">
                  작성
                </Button>
              </div>
            </form>
          ) : (
            <form className="flex gap-3">
              <Input
                border={false}
                inputStyleType="comment"
                inputType="text"
                holderMsg="로그인 후 작성가능합니다."
                name="commentInput"
                disabled={true}
              />
              <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Button buttonStyle="yellow xs" disabled>
                  작성
                </Button>
              </div>
            </form>
          )}
        </div>

        <ul className="w-[500px] h-[420px] overflow-auto mt-4 border-black">
          {data?.pages.flatMap(page => page.map(comment => <Comment key={comment.id} comment={comment} />))}
          <div ref={ref}></div>
        </ul>
      </div>
    </>
  );
};

export default CommentList;
