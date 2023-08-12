import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { addComment, getComments, getTotalCommentCount } from 'api/comments';
import { Input } from 'components/shared';
import Button from 'components/shared/Button';
import { auth } from 'config/firebase';

import Comment from './Comment';
import CommentOutlined from '../../assets/CommentOutlined.svg';

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

  if (isLoading) return <>댓글 로딩중</>;

  return (
    <>
      <div className="flex flex-col ml-10">
        <div className="flex items-center pb-2 border-b border-black">
          <img src={CommentOutlined} alt="comment" />
          <p className="ml-4 text-[30px]">댓글</p>
          <p className="ml-2 text-[30px] text-grid text-red">{totalCommentCount}</p>
        </div>

        <div className="mt-8">
          {isLogin ? (
            <form className="flex gap-3" onSubmit={handleAddComment}>
              <Input
                border={false}
                inputStyleType="comment"
                inputType="text"
                holderMsg="댓글을 입력해주세요!"
                name="commentInput"
                value={value}
                onChange={e => {
                  setValue(e.target.value);
                }}
              />
              <Button buttonStyle="yellow xs" type="submit">
                작성
              </Button>
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
              <Button buttonStyle="yellow xs" disabled>
                작성
              </Button>
            </form>
          )}
        </div>

        <ul className="w-[450px] mt-4 border-black">
          {data?.pages.flatMap(page => page.map(comment => <Comment key={comment.id} comment={comment} />))}
        </ul>
        <div className="h-2 mt-[300px]" ref={ref}></div>
      </div>
    </>
  );
};

export default CommentList;
