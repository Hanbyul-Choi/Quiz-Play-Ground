import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getGameData } from 'api/gameData';
import Button from 'components/shared/Button';
import CorrectModal from 'components/shared/modal/CorrectModal';
import InCorrectModal from 'components/shared/modal/InCorrectModal';
import ProgressBar from 'components/shared/ProgressBar';
import { categoryMatchKo, topicMatch } from 'pages';
import { gameResultStore, modalStateStore, setTimerStore } from 'store';

import { Input, Label } from '../shared';

type resultType = 'inprogress' | 'isCorrect' | 'isWrong';

export const PictureGame = () => {
  const { timer } = setTimerStore();
  const params = useParams();
  const navigate = useNavigate();
  const { category, postid } = params ?? '';
  const location = useLocation();
  const topic = location.search.split('=')[1];

  const answerRef = useRef<HTMLInputElement | null>(null);

  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<resultType>('inprogress');
  const [color, setColor] = useState('bg-green');

  const { isCorrectModalOpen, isInCorrectModalOpen, openCorrectModal, openInCorrectModal } = modalStateStore();
  const { sendScore, sendTotalQuiz } = gameResultStore();

  useEffect(() => {
    setColor('bg-green');
    if (timer > 0) {
      const timeoutId = setTimeout(() => {
        setColor('bg-red');
      }, timer * 0.8);

      const timeId = setTimeout(() => {
        setResult('isWrong');
        openInCorrectModal();
      }, timer);

      // 미리 정답을 제출했을 때
      if (result === 'isCorrect' || result === 'isWrong') {
        clearTimeout(timeId);
      }
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(timeId);
      };
    }
  }, [currentQuiz, result]);

  useEffect(() => {
    answerRef.current?.focus();
  }, [currentQuiz]);

  const clickNextQuiz = () => {
    setCurrentQuiz(prev => prev + 1);
    setAnswer('');
    setResult('inprogress');
    if (currentQuiz === data?.length) {
      // initState();
      sendTotalQuiz(data.length);
      if (result === 'isCorrect') {
        // 마지막 문제를 맞혔을 때 스코어를 스토어로 보내기
        sendScore(score + 1);
      } else if (result === 'isWrong') {
        // 마지막 문제를 틀렸을 때 기존 스코어를 스토어로 보내기
        sendScore(score);
      }
      navigate(`/gameresult/${postid as string}`);
    }
  };

  if (postid === undefined) return;
  const { data } = useQuery('gameData', async () => await getGameData(postid));
  if (data === undefined) return;

  const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 정답일때
    if (data[currentQuiz - 1].answer === answer) {
      setScore(prev => prev + 1);
      setResult('isCorrect');
      openCorrectModal();
      setTimeout(() => {
        clickNextQuiz();
      }, 1500);
      sendScore(score + 1);
    } else {
      // 오답일때
      openInCorrectModal();
      setResult('isWrong');
      sendScore(score);
    }
  };
  return (
    <div className="flex flex-col items-center font-medium gap-y-12">
      <h2 className="font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[50px] text-skyBlue flex gap-2">
        {categoryMatchKo[category ?? '']}
        {<p className="text-blue"> - </p>}
        {topicMatch[topic ?? '']}
      </h2>
      <div>
        <div className="flex justify-between m-2">
          <b>
            {currentQuiz}/{data.length}
          </b>
          <b>현재 점수: {score}</b>
        </div>
        <div className="flex flex-cols gap-[60px] relative  rounded-[10px]">
          <div className="flex flex-col items-center rounded-[10px] bg-white border-2 border-black w-[470px] h-[400px] justify-center text-2xl">
            <img className="object-contain w-full h-full p-6 " src={data[currentQuiz - 1]?.question} alt="" />
          </div>
          <div className="absolute z-[-10] top-2 left-2 w-[470px] h-[400px] border-b-[12px] border-r-[12px] border-skyBlue rounded-[10px]" />

          <form
            onSubmit={submitAnswer}
            className="flex flex-col items-center rounded-xl w-[470px] h-[400px] border-4 border-gray2 justify-center"
          >
            <Label name="game">사진 속 인물의 이름을 입력해주세요!</Label>
            <Input
              forwardRef={answerRef}
              inputType="text"
              inputStyleType="answer"
              name="game"
              value={answer}
              onChange={e => {
                setAnswer(e.target.value);
              }}
              border={false}
              disabled={result !== 'inprogress'}
              autoFocus={true}
              autocomplete="off"
            />
          </form>
        </div>
      </div>
      {result === 'isWrong' && (
        <div className="text-center">
          <div className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-[23px]">
            <Button buttonStyle="yellow md" onClick={clickNextQuiz}>
              {currentQuiz === data.length ? '결과보기' : '다음문제'}
            </Button>
          </div>
          <div className="mt-10 text-2xl font-bold text-green">정답 : {data[currentQuiz - 1].answer}</div>
        </div>
      )}
      {isCorrectModalOpen && result === 'isCorrect' && <CorrectModal />}
      {isInCorrectModalOpen && result === 'isWrong' && <InCorrectModal />}
      {result === 'inprogress' && <ProgressBar time={timer} color={color} />}
    </div>
  );
};
