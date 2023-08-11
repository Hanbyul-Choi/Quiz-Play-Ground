import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getGameData } from 'api/gameData';
import Button from 'components/shared/Button';
import CorrectModal from 'components/shared/modal/CorrectModal';
import InCorrectModal from 'components/shared/modal/InCorrectModal';
import { categoryMatch } from 'pages';
import { modalStateStore } from 'store';

import { Input, Label } from '../shared';

export const TextGame = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { category, postid } = params ?? '';
  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);

  const isCorrectModalOpen = modalStateStore(state => state.isCorrectModalOpen);
  const toggleCorrectModal = modalStateStore(state => state.toggleCorrectModal);
  const isInCorrectModalOpen = modalStateStore(state => state.isInCorrectModalOpen);
  const toggleInCorrectModal = modalStateStore(state => state.toggleInCorrectModal);

  const clickNextQuiz = () => {
    if (currentQuiz === data?.length) {
      navigate('/gameresult');
    }
    setCurrentQuiz(prev => prev + 1);
    setAnswer('');
    setIsWrong(prev => !prev);
  };

  if (postid === undefined) return;

  const { data } = useQuery('gameData', async () => await getGameData(postid));
  console.log(data);
  if (data === undefined) return;

  const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data[currentQuiz - 1].answer === answer) {
      setScore(prev => prev + 1);
      toggleCorrectModal();
      setTimeout(() => {
        clickNextQuiz();
      }, 1500);
    } else {
      toggleInCorrectModal();
      setIsWrong(prev => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center font-medium gap-y-16">
      <h1 className="mt-8 mb-12 text-3xl">{categoryMatch[category ?? '']}</h1>
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
          inputType="text"
          inputStyleType="answer"
          name="game"
          value={answer}
          onChange={e => {
            setAnswer(e.target.value);
          }}
          border={false}
        />
      </form>
      {isWrong && (
        <Button buttonStyle="yellow md" onClick={clickNextQuiz}>
          {currentQuiz === data.length ? '결과보기' : '다음문제'}
        </Button>
      )}
      {isCorrectModalOpen && <CorrectModal toggleModal={toggleCorrectModal} />}
      {isInCorrectModalOpen && <InCorrectModal toggleModal={toggleInCorrectModal} />}
      <div className="w-[800px] h-8 rounded-full bg-gray2">
        <div className="w-[60%] h-full rounded-full bg-green"></div>
      </div>
    </div>
  );
};
