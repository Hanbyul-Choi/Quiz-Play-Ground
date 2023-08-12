import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getGameInfo } from 'api/gameData';
import { Dropdown } from 'components/shared/Dropdown';
import { setTimerStore } from 'store';

import { categoryMatchKo, topicMatch } from './Main';

type Match = Record<string, number>;

export const timerMatch: Match = {
  '3초': 3000,
  '5초': 5000,
  '7초': 7000
};

export const Game = () => {
  const navigate = useNavigate();
  const params = useParams() ?? '';
  const { category, postid } = params;
  const { setTimer } = setTimerStore();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get('game');

  const { data } = useQuery('gameInfo', async () => await getGameInfo(postid as string));

  return (
    <div className="flex flex-col items-center mt-32 font-medium gap-y-20">
      <h1 className="text-3xl font-bold">{data !== undefined && `${data.title as string}`}</h1>
      <div className="flex flex-col items-center rounded-xl w-[1000px] h-[340px] bg-hoverSkyBlue shadow-md justify-center gap-y-10">
        <h2 className="text-2xl font-bold">
          {categoryMatchKo[category as string]} {topic != null && `- ${topicMatch[topic]}`}
        </h2>
        <h4 className="text-lg font-bold">{data !== undefined && `${data.totalQuiz as string}문항`}</h4>
        <div className="flex items-center ml-[-75px]">
          제한시간: &nbsp;
          <Dropdown
            options={['3초', '5초', '7초']}
            onChange={val => {
              const time = timerMatch[val];
              setTimer(time);
            }}
            border={true}
          />
        </div>
        <button
          onClick={() => {
            navigate(`/textgame/${category ?? ''}/${postid ?? ''}`);
          }}
          className="px-3 py-1 text-xl shadow-md rounded-2xl bg-yellow"
        >
          게임시작
        </button>
      </div>
      <div className="w-[1000px] text-gray4">
        <p>게임 방법</p>
        <br />
        <p>&nbsp;1. 제한시간 내에 답을 작성하고 enter를 눌러 제출해주세요.</p>
        <p>&nbsp;2. 제한시간 내에 정답을 맞추거나, 틀릴 경우 다음 문제 버튼을 눌러 넘어가세요.</p>
        <p>&nbsp;3. 마지막 문제까지 모두 완료하면 게임 결과를 확인해 볼 수 있습니다.</p>
      </div>
    </div>
  );
};
