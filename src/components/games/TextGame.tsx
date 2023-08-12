import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getGameData } from 'api/gameData';
import Button from 'components/shared/Button';
import CorrectModal from 'components/shared/modal/CorrectModal';
import InCorrectModal from 'components/shared/modal/InCorrectModal';
import ProgressBar from 'components/shared/ProgressBar';
import { categoryMatchKo } from 'pages';
import { gameResultStore, modalStateStore, setTimerStore } from 'store';

import { Input, Label } from '../shared';

type resultType = 'inprogress' | 'isCorrect' | 'isWrong';

export const TextGame = () => {
  const { timer } = setTimerStore();
  const params = useParams();
  const navigate = useNavigate();
  const { category, postid } = params ?? '';

  const answerRef = useRef<HTMLInputElement | null>(null);

  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<resultType>('inprogress');
  const [color, setColor] = useState('bg-green');

  const { isCorrectModalOpen, isInCorrectModalOpen, openCorrectModal, openInCorrectModal } = modalStateStore();
  const { sendScore } = gameResultStore();

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
    } else {
      // 오답일때
      openInCorrectModal();
      setResult('isWrong');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 font-medium gap-y-16">
      <h1 className="mt-8 mb-12 text-3xl">{categoryMatchKo[category ?? '']}</h1>
      <div>
        <div className="flex justify-between m-2">
          <b>
            {currentQuiz}/{data.length}
          </b>
          <b>현재 점수: {score}</b>
        </div>
        <div className="flex flex-col items-center rounded-xl w-[1000px] h-[150px] bg-hoverSkyBlue shadow-md justify-center gap-y-16 text-2xl">
          {data[currentQuiz - 1]?.question}
        </div>
      </div>
      <form
        onSubmit={submitAnswer}
        className="flex flex-col items-center rounded-xl w-[1000px] h-[150px] border-4 border-gray2 justify-center"
      >
        <Label name="game">뒤에 이어질 단어를 입력해주세요!</Label>
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
        />
      </form>
      {result === 'isWrong' && (
        <div className="text-center">
          <Button buttonStyle="yellow md" onClick={clickNextQuiz}>
            {currentQuiz === data.length ? '결과보기' : '다음문제'}
          </Button>
          <div className="mt-10">정답 : {data[currentQuiz - 1].answer}</div>
        </div>
      )}
      {isCorrectModalOpen && result === 'isCorrect' && <CorrectModal />}
      {isInCorrectModalOpen && result === 'isWrong' && <InCorrectModal />}
      {result === 'inprogress' && <ProgressBar time={timer} color={color} />}
    </div>
  );
};
