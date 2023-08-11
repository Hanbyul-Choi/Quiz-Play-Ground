import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { deleteComment, updateComment } from 'api/comments';

interface CommentWithNameType {
  id: string;
  userId: string;
  postId: string;
  content: string;
  date: string;
  userName: string;
  userImg: string;
}

interface CommentProps {
  comment: CommentWithNameType;
}

const Comment = ({ comment }: CommentProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [value, setValue] = useState(comment.content);

  const queryClient = useQueryClient();

  const mutationCommentDelete = useMutation(deleteComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`gameResultComment`] });
    },
    onError: error => {
      alert(error);
    }
  });

  const mutationCommentUpdate = useMutation(updateComment, {
    onSuccess: async () => {
      setIsUpdating(false);
      await queryClient.invalidateQueries({ queryKey: [`gameResultComment`] });
    },
    onError: error => {
      alert(error);
    }
  });

  const handleCommentDelete = (id: string) => {
    if (id == null) return;
    const confirm = window.confirm('이 댓글을 삭제하시겠습니까?');
    if (!confirm) return;
    mutationCommentDelete.mutate(id);
  };

  const handleCommentUpdateStart = () => {
    setValue(comment.content);
    setIsUpdating(true);
  };

  const handleUpdateCandle = () => {
    setIsUpdating(false);
  };

  const handleCommentUpdateDone = () => {
    if (comment.id === '') return;
    mutationCommentUpdate.mutate({ id: comment.id, content: value });
    setIsUpdating(false);
  };

  return (
    <li>
      <p className="mt-4 pl-1 text-gray4 text-[12px]">{comment.userName}</p>

      {isUpdating ? (
        <div className="flex justify-between items-center border-b border-gray4">
          <form className="flex">
            <input
              className="p-2 outline-none text-gray3"
              value={value}
              onChange={e => {
                setValue(e.target.value);
              }}
              autoFocus
            />
          </form>
          <div className="flex flex-col">
            <div className="flex justify-end gap-1">
              <button type="submit" onClick={handleCommentUpdateDone}>
                완료
              </button>
              <button type="button" onClick={handleUpdateCandle}>
                취소
              </button>
            </div>
            <p className="pl-1 text-gray4 text-[12px]">{comment.date}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center border-b border-gray4">
          <p className="p-1">{comment.content}</p>

          <div className="flex flex-col">
            <div className="flex justify-end gap-1">
              <button onClick={handleCommentUpdateStart}>
                <img className="mb-2" src={'./assets/EditOutlined.svg'} alt="edit" />
              </button>
              <button
                onClick={() => {
                  handleCommentDelete(comment.id);
                }}
              >
                <img className="mb-2" src={'./assets/DeleteOutlined.svg'} alt="delete" />
              </button>
            </div>
            <p className="pl-1 text-gray4 text-[12px]">{comment.date}</p>
          </div>
        </div>
      )}
    </li>
  );
};

export default Comment;
