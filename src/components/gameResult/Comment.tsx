import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { deleteComment, updateComment } from 'api/comments';
import { userStore } from 'store';

import DeleteOutlined from '../../assets/DeleteOutlined.svg';
import EditOutlined from '../../assets/EditOutlined.svg';

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
  const { userId } = userStore();

  const queryClient = useQueryClient();

  const mutationCommentDelete = useMutation(deleteComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`gameResultComment`] });
      await queryClient.invalidateQueries({ queryKey: ['totalComments', comment.postId] });
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

  const handleUpdateCancel = () => {
    setIsUpdating(false);
  };

  const handleCommentUpdateDone = () => {
    if (comment.id === '' || comment.id == null) return;
    mutationCommentUpdate.mutate({ id: comment.id, content: value });
    setIsUpdating(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCommentUpdateDone();
  };

  // ISO 날짜 형식 변환
  function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul'
    };

    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const parts = formatter.formatToParts(date);

    const year = parts.find(part => part.type === 'year')?.value ?? '';
    const month = parts.find(part => part.type === 'month')?.value ?? '';
    const day = parts.find(part => part.type === 'day')?.value ?? '';
    const hour = parts.find(part => part.type === 'hour')?.value ?? '';
    const minute = parts.find(part => part.type === 'minute')?.value ?? '';
    const second = parts.find(part => part.type === 'second')?.value ?? '';
    const period = parts.find(part => part.type === 'dayPeriod')?.value ?? '';

    return `${year}. ${month}. ${day}. ${period} ${hour}:${minute}:${second}`;
  }

  return (
    <div className="relative bg-white rounded-[10px]">
      <li className="mt-4 border-2 border-black rounded-[10px] p-2 w-[450px] h-[120px]">
        <p className="mt-4 pl-1 text-gray4 text-[12px]">
          {comment.userName} · {formatDate(comment.date)}
        </p>
        {isUpdating ? (
          <div className="flex items-center justify-between">
            <form className="flex" onSubmit={handleFormSubmit}>
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
                <button type="button" onClick={handleUpdateCancel}>
                  취소
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="p-1 mt-4 font-bold">{comment.content}</p>
            <div className="absolute flex flex-col right-3 bottom-2">
              {userId === comment.userId && (
                <div className="flex justify-end gap-1">
                  <button onClick={handleCommentUpdateStart}>
                    <img className="mb-2" src={EditOutlined} alt="edit" />
                  </button>
                  <button
                    onClick={() => {
                      handleCommentDelete(comment.id);
                    }}
                  >
                    <img className="mb-2" src={DeleteOutlined} alt="delete" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </li>
      <div className="absolute z-[-10] top-1 left-1 w-[450px] h-[120px] border-b-[6px] border-r-[6px] border-yellow rounded-[10px]" />
    </div>
  );
};

export default Comment;
