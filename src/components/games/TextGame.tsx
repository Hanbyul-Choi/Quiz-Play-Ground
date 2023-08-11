import { Input, Label } from '../shared';

export const TextGame = () => {
  return (
    <div className="flex flex-col items-center font-medium gap-y-16">
      <h1 className="mt-8 mb-12 text-3xl">이어말하기</h1>
      <div>
        <div className="flex justify-between m-2">
          <b>1/20</b>
          <b>현재 점수: 0</b>
        </div>
        <div className="flex flex-col items-center rounded-xl w-[1000px] h-[150px] bg-hoverSkyBlue shadow-md justify-center gap-y-16 text-2xl">
          두문
        </div>
      </div>
      <form className="flex flex-col items-center rounded-xl w-[1000px] h-[150px] border-4 border-gray2 justify-center">
        <Label name="game">뒤에 이어질 단어를 입력해주세요!</Label>
        <Input inputType="text" inputStyleType="answer" name="game" border={false} />
      </form>
      <div className="w-[800px] h-8 rounded-full bg-gray2">
        <div className="w-[60%] h-full rounded-full bg-green"></div>
      </div>
    </div>
  );
};
