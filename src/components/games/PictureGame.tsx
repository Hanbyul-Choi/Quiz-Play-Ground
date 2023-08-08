import testImg from '../../assets/testImg.png';
import { Input, Label } from '../shared';

export const PictureGame = () => {
  return (
    <div className="flex flex-col items-center font-medium gap-y-12">
      <h1 className="mt-8 text-3xl">인물 퀴즈</h1>
      <div>
        <div className="flex justify-between m-2">
          <b>1/20</b>
          <b>현재 점수: 0</b>
        </div>
        <div className="grid grid-cols-2 gap-x-[60px]">
          <div className="flex flex-col items-center rounded-xl w-[470px] h-[400px] bg-hoverSkyBlue shadow-md justify-center gap-y-16 text-2xl">
            <img className="p-8" src={testImg} alt="" />
          </div>
          <form className="flex flex-col items-center rounded-xl w-[470px] h-[400px] border-4 border-gray2 justify-center">
            <Label name="game">사진 속 인물의 이름을 입력해주세요!</Label>
            <Input inputType="text" inputStyleType="answer" name="game" />
          </form>
        </div>
      </div>
      <div className="w-[800px] h-8 rounded-full bg-gray2">
        <div className="w-[60%] h-full rounded-full bg-green"></div>
      </div>
    </div>
  );
};
