import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { addComment, getComments } from 'api/comments';
import { Input } from 'components/shared';
import Button from 'components/shared/Button';

import Comment from './Comment';

const CommentList = () => {
  const queryClient = useQueryClient();

  const [isLogin] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  const postId: string = '1';
  const { isLoading, data } = useQuery(['gameResultComment', postId], async () => await getComments(postId));

  const mutationAddComment = useMutation(addComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['gameResultComment'] });
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

  if (isLoading) return <>댓글 로딩중</>;

  return (
    <div className="flex flex-col ml-10">
      <div className="flex items-center pb-3 border-b border-black">
        <img src={'./assets/CommentOutlined.svg'} alt="comment" />
        <p className="ml-4 text-[30px]">댓글</p>
        <p className="ml-4 text-[30px] text-grid text-red">1</p>
      </div>

      <div className="mt-8">
        {isLogin ? (
          <form className="flex gap-3" onSubmit={handleAddComment}>
            <Input
              inputStyleType="comment"
              inputType="text"
              holderMsg="댓글을 입력해주세요!"
              name="commentInput"
              value={value}
              onChange={e => {
                setValue(e.target.value);
              }}
              border={false}
            />
            <Button buttonStyle="yellow xs" type="submit">
              작성
            </Button>
          </form>
        ) : (
          <form className="flex gap-3">
            <Input
              inputStyleType="comment"
              inputType="text"
              holderMsg="로그인 후 작성가능합니다."
              name="commentInput"
              border={false}
            />
            <Button buttonStyle="yellow xs" disabled>
              작성
            </Button>
          </form>
        )}
      </div>

      <ul className="w-[450px] mt-4 border-black">
        {data?.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
