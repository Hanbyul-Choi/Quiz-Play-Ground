/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import { Input } from 'components/shared';
import Button from 'components/shared/Button';
import { useDialog } from 'components/shared/Dialog';
import { Dropdown } from 'components/shared/Dropdown';
import { db } from 'config/firebase';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { userStore } from 'store';

interface InputType {
  text: string;
}

interface Props {
  topic: boolean;
  selectCategory: string;
  gameTitle: string;
}

interface GameListType {
  id: number;
  question: string;
  answer: string;
}

type Match = Record<string, string>;

export const topicMatch: Match = {
  속담: 'proverb',
  사자성어: 'idiom',
  일상단어: '4words'
};

export const AddTextGame = ({ topic, selectCategory, gameTitle }: Props) => {
  const [countList, setCountList] = useState<number[]>([0]);
  const [question, setQuestion] = useState<InputType[]>([{ text: '' }]);
  const [answer, setAnswer] = useState<InputType[]>([{ text: '' }]);
  const [quiz, setQuiz] = useState<GameListType[]>([]);
  const [selectTopic, setSelectTopic] = useState<string | null>(null);

  const { Alert, Confirm } = useDialog();
  const { userName, userId } = userStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (question[0].text === '' && answer[0].text === '') return;
    void clearState();
  }, [selectCategory]);

  const clearState = async (): Promise<void> => {
    if ((await Confirm('변경')) === false) return;
    setCountList([0]);
    setQuestion([{ text: '' }]);
    setAnswer([{ text: '' }]);
    setQuiz([]);
    setSelectTopic('');
  };

  const questionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const updatedQuestions = [...question];
    updatedQuestions[idx].text = e.target.value;
    setQuestion(updatedQuestions);
    updateQuiz(idx, e.target.value, 'question');
  };

  const answerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const updatedAnswers = [...answer];
    updatedAnswers[idx].text = e.target.value;
    setAnswer(updatedAnswers);
    updateQuiz(idx, e.target.value, 'answer');
  };

  const updateQuiz = (idx: number, text: string, type: string): void => {
    const updatedQuiz = [...quiz];
    if (type === 'question') {
      updatedQuiz[idx] = { ...updatedQuiz[idx], question: text };
    } else if (type === 'answer') {
      updatedQuiz[idx] = { ...updatedQuiz[idx], answer: text };
    } else if (type === 'delete') {
      updatedQuiz.splice(idx, 1);
    }
    setQuiz(updatedQuiz);
  };

  const divDeleteHandler = (item: number, idx: number) => {
    const deleteDiv = countList.filter(el => el !== item);
    setCountList(deleteDiv);

    const deletedQuestions = question.filter((_, i) => i !== item);
    setQuestion(deletedQuestions);

    const deletedAnswers = answer.filter((_, i) => i !== item);
    setAnswer(deletedAnswers);

    updateQuiz(idx, '', 'delete');
  };

  const divAddHandler = (): void => {
    const countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountList(countArr);
    setQuestion([...question, { text: '' }]);
    setAnswer([...answer, { text: '' }]);
  };

  const PostGameList = async (): Promise<void> => {
    if (gameTitle === '') {
      await Alert('제목을 입력해주세요.');
      return;
    }
    if (topic && selectTopic === '') {
      await Alert('게임 주제를 선택해주세요.');
      return;
    }
    if (quiz.length <= 4) {
      await Alert('5문제 이상 작성해주세요.');
      return;
    }

    const id = uuid();

    const gameList = {
      date: Date.now(),
      userId,
      userName,
      category: selectCategory,
      topic: selectTopic,
      title: gameTitle,
      totalQuiz: quiz.length
    };
    try {
      await setDoc(doc(db, 'GameLists', id), gameList);
      await setDoc(doc(db, 'Games', id), { quiz });
      await Alert('성공');
      navigate('/main');
    } catch (error) {
      let errorMsg: string = '';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          default:
            errorMsg = '작성이 실패했습니다.';
            break;
        }
      }
      await Alert(errorMsg);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col p-2 gap-y-2 border-t-[1px] border-black">
          {!topic ? (
            <></>
          ) : (
            <Dropdown
              options={['속담', '사자성어', '일상단어']}
              onChange={val => {
                setSelectTopic(topicMatch[val]);
              }}
              size="lg"
              border={true}
              text="주제 선택"
            />
          )}
          <p>작성된 문항 수: 0</p>
        </div>
        <ul>
          {countList?.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-center gap-x-16 rounded-xl w-[1000px] h-[150px] bg-hoverSkyBlue shadow-md mb-10"
            >
              <Input
                inputType="textarea"
                inputStyleType="quiz"
                holderMsg="문제를 입력해주세요."
                onChange={e => {
                  questionChangeHandler(e, idx);
                }}
                value={question[idx]?.text}
                border={false}
              />
              {item !== 0 ? (
                <button
                  className="relative w-4 bottom-[38%] left-[48%]"
                  onClick={() => {
                    divDeleteHandler(item, idx);
                  }}
                >
                  X
                </button>
              ) : (
                <div className="w-4" />
              )}
              <Input
                inputType="textarea"
                inputStyleType="quiz"
                holderMsg="정답을 입력해주세요."
                onChange={e => {
                  answerChangeHandler(e, idx);
                }}
                value={answer[idx]?.text}
                border={false}
              />
            </li>
          ))}
        </ul>
        <Button buttonStyle="gray2 md full outlined" onClick={divAddHandler}>
          +
        </Button>
      </div>
      <Button buttonStyle="yellow md" onClick={PostGameList}>
        작성 완료
      </Button>
    </>
  );
};
