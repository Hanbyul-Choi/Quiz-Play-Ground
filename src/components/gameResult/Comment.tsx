import { useState } from 'react';

import { Input } from 'components/shared';
import Button from 'components/shared/Button';

const Comment = () => {
  const [isLogin] = useState<boolean>(false);

  return (
    <div className="flex flex-col ml-10">
      <div className="flex items-center pb-3 border-b border-black">
        <img src={'./assets/CommentOutlined.svg'} alt="comment" />
        <p className="ml-4 text-[30px]">댓글</p>
        <p className="ml-4 text-[30px] text-grid text-red">1</p>
      </div>

      <div className="flex gap-3 mt-8">
        {isLogin ? (
          <>
            <Input inputStyleType="comment" inputType="text" holderMsg="댓글을 입력해주세요!" name="commentInput" />
            <Button buttonStyle="yellow xs" onClick={() => {}}>
              작성
            </Button>
          </>
        ) : (
          <>
            <Input
              inputStyleType="comment"
              inputType="text"
              holderMsg="로그인 후 작성가능합니다."
              name="commentInput"
            />
            <Button buttonStyle="yellow xs" onClick={() => {}}>
              작성
            </Button>
          </>
        )}
      </div>

      <ul className="w-[450px] mt-4 border-black">
        <li>
          <p className="mt-4 pl-1 text-gray4 text-[12px]">익명의 기러기</p>
          <div className="flex justify-between border-b border-gray4">
            <p className="p-1">개어렵누</p>
            <div className="flex gap-2">
              <p className="text-gray4">2023.08.08</p>
              <button>
                <img className="mb-2" src={'./assets/EditOutlined.svg'} alt="edit" />
              </button>
              <button>
                <img className="mb-2" src={'./assets/DeleteOutlined.svg'} alt="delete" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Comment;
