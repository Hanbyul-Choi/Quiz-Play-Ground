import { useNavigate } from 'react-router-dom';

export const Game = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-32 font-medium gap-y-20">
      <div className="flex flex-col items-center rounded-xl w-[1000px] h-[340px] bg-hoverSkyBlue shadow-md justify-center gap-y-16">
        <h1 className="text-3xl">이어말하기</h1>
        <p className="ml-[-75px]">
          제한시간: &nbsp;
          <select className="px-3 rounded-lg shadow-md ">
            <option>3초</option>
            <option>5초</option>
            <option>7초</option>
          </select>
        </p>
        <button onClick={() => navigate('/textgame/1/1')} className="px-3 py-1 text-xl shadow-md rounded-2xl bg-yellow">
          게임시작
        </button>
      </div>
      <div className="w-[1000px] text-gray4">
        <p>게임 방법</p>
        <br />
        <p>&nbsp;1. 제한시간 내에 답을 입력해주세요.</p>
        <p>&nbsp;2. 제한시간 내에 정답을 맞추거나, 틀릴 경우 '다음 문제' 버튼을 눌러 넘어가세요.</p>
        <p>&nbsp;3. 마지막 문제까지 모두 완료하면 게임 결과를 확인해 볼 수 있습니다.</p>
      </div>
    </div>
  );
};
