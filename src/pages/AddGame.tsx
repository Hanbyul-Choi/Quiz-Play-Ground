import { useState } from 'react';

import { AddPictureGame, AddTextGame } from 'components/games';
import { Input } from 'components/shared';
import { Dropdown } from 'components/shared/Dropdown';

type Match = Record<string, string>;

export const reverseCategoryMatch: Match = {
  이어말하기: 'relay',
  넌센스퀴즈: 'nonsensequiz',
  인물퀴즈: 'personquiz',
  신조어퀴즈: 'mzwordsquiz'
};

export const AddGame = () => {
  const [selectCategory, setSelectCategory] = useState<string>('');
  const [gameTitle, setGameTitle] = useState<string>('');

  return (
    <div>
      <div className="flex flex-col items-center w-[1000px] font-medium gap-y-16">
        <div className="flex items-start w-full p-2 mt-8 gap-x-10">
          <Dropdown
            options={['이어말하기', '넌센스퀴즈', '인물퀴즈', '신조어퀴즈']}
            onChange={val => {
              setSelectCategory(reverseCategoryMatch[val]);
            }}
            size="lg"
            border={true}
            text="카테고리 선택"
          />
          <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full">
            <Input
              inputType="text"
              inputStyleType="auth"
              holderMsg="제목을 입력해주세요."
              onChange={e => {
                setGameTitle(e.target.value);
              }}
              value={gameTitle}
              border={true}
            />
          </div>
        </div>
        <ul className="w-full list-disc list-inside text-start text-gray3">
          <li>최소 문항 수는 5개입니다.</li>
          <li>상대방에게 불쾌한 인식을 주는 문제는 관리자에 의해 언제든 삭제될 수 있음을 알려드립니다.</li>
          <li>중복된 문제가 있을 시 관련 문항은 삭제될 수 있습니다.</li>
          <li>카테고리 이동 시 기존에 작성했던 내용들은 삭제되니 참고하시기 바랍니다.</li>
        </ul>
        {selectCategory === 'relay' ? (
          <AddTextGame topic={true} selectCategory={selectCategory} gameTitle={gameTitle} />
        ) : selectCategory === 'nonsensequiz' ? (
          <AddTextGame topic={false} selectCategory={selectCategory} gameTitle={gameTitle} />
        ) : selectCategory === 'mzwordsquiz' ? (
          <AddTextGame topic={false} selectCategory={selectCategory} gameTitle={gameTitle} />
        ) : selectCategory === 'personquiz' ? (
          <AddPictureGame topic={true} selectCategory={selectCategory} gameTitle={gameTitle} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
