import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getGameInfo } from 'api/gameData';
import countsound from 'assets/audio/countsound.mp3';
import { useDialog } from 'components/shared/Dialog';
import { Dropdown } from 'components/shared/Dropdown';
import useSound from 'hooks/useSound';
import { setTimerStore } from 'store';

import { categoryMatchKo, topicMatch } from './Main';

type Match = Record<string, number>;

export const timerMatch: Match = {
  '3초': 3000,
  '5초': 5000,
  '7초': 7000,
  '10초': 10000,
  '30초': 30000
};

const Countdown = ({ countDown }: { countDown: number }) => {
  useSound(countsound, 0.5, 3000);
  return <div className="text-lg">{countDown}</div>;
};

export const Game = () => {
  const navigate = useNavigate();
  const params = useParams() ?? '';
  const { category, postid } = params;
  const { setTimer } = setTimerStore();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get('game');
  const [started, setStarted] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [selectedtime, setSelectedTime] = useState<string | null>(null);

  const { data } = useQuery('gameInfo', async () => await getGameInfo(postid as string));

  const { Alert } = useDialog();

  return (
    <div className="flex flex-col items-center font-medium mt-28 gap-y-20">
      <h2 className="font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-skyBlue">
        {data !== undefined && `${data.title as string}`}
      </h2>
      <div className="relative rounded-[10px] bg-white">
        <div className="flex flex-col items-center rounded-[10px] w-[1000px] h-[340px] border-2 border-black justify-center gap-y-10">
          <h3 className="text-2xl font-bold">
            {categoryMatchKo[category as string]} {topic != null && `- ${topicMatch[topic]}`}
          </h3>
          <h4 className="text-lg font-bold">{data !== undefined && `${data.totalQuiz as string}문항`}</h4>
          <div className="flex items-center ml-[-75px]">
            제한시간: &nbsp;
            <Dropdown
              options={['3초', '5초', '7초', '10초', '30초']}
              onChange={val => {
                setSelectedTime(val);
                const time = timerMatch[val];
                setTimer(time);
              }}
              border={true}
            />
          </div>
          {started ? (
            <Countdown countDown={countDown} />
          ) : (
            <div className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-[20px]">
              <button
                onClick={() => {
                  if (selectedtime === null) {
                    Alert('시간을 선택하세요').catch(Error);
                    return;
                  }
                  setStarted(true);

                  setInterval(() => {
                    setCountDown(prev => prev - 1);
                  }, 1200);
                  setTimeout(() => {
                    navigate(
                      `/${categoryMatchKo[category as string] === '인물 퀴즈' ? 'picturegame' : 'textgame'}/${
                        category ?? ''
                      }/${postid ?? ''}/${topic !== null ? '?game=' + topic : ''}`
                    );
                  }, 3600);
                }}
                className="px-3 py-1 text-xl shadow-md rounded-2xl bg-yellow"
              >
                게임시작
              </button>
            </div>
          )}
          <div className="absolute z-[-10] top-2 left-2 w-[1000px] h-[340px] border-b-[12px] border-r-[12px] border-skyBlue rounded-[10px]" />
        </div>
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
