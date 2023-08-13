/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react';
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

export const PicTopicMatch: Match = {
  배우: 'actor',
  가수: 'singer',
  캐릭터: 'character',
  운동선수: 'sports',
  위인: 'greatman',
  종합: 'mix'
};

export const AddPictureGame = ({ topic, selectCategory, gameTitle }: Props) => {
  const [countList, setCountList] = useState<number[]>([0]);
  const [question, setQuestion] = useState<string[]>([]);
  const [answer, setAnswer] = useState<InputType[]>([{ text: '' }]);
  const [quiz, setQuiz] = useState<GameListType[]>([]);
  const [viewImg, setViewImg] = useState<string[]>([]);
  const [selectTopic, setSelectTopic] = useState<string | null>(null);

  const { Alert } = useDialog();
  const { userId, userName } = userStore();

  const navigate = useNavigate();
  console.log(question);
  console.log(viewImg);
  useEffect(() => {
    clearState();
  }, [selectCategory]);

  const clearState = (): void => {
    setCountList([0]);
    setQuestion([]);
    setAnswer([{ text: '' }]);
    setQuiz([]);
    setSelectTopic('');
  };

  const questionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const updateQuestion: string[] = [];
    if (files != null && files.length > 0) {
      saveImg(files[0]);
      updateQuestion.push(files[0].name);
      setQuestion([...question, ...updateQuestion]);
    }
  };

  const answerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const updatedAnswers = [...answer];
    updatedAnswers[idx].text = e.target.value;
    setAnswer(updatedAnswers);
    updateQuiz(idx, e.target.value, 'answer');
  };

  const updateQuiz = (idx: number, text: string, type: string): void => {
    const updatedQuiz = [...quiz];
    if (type === 'answer') {
      updatedQuiz[idx] = { ...updatedQuiz[idx], question: viewImg[idx], answer: text };
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

    const deletedViewImg = viewImg.filter((_, i) => i !== item);
    setViewImg(deletedViewImg);

    updateQuiz(idx, '', 'delete');
  };

  const divAddHandler = (): void => {
    const countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountList(countArr);

    // setQuestion([...question, '']);
    setAnswer([...answer, { text: '' }]);
    // setViewImg([...viewImg, '']);
  };

  const saveImg = (files: File): void => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = () => {
      const img = reader?.result as string;
      setViewImg([...viewImg, img]);
    };
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

  console.log(quiz);

  return (
    <>
      <div>
        <div className="flex flex-col p-2 gap-y-2 border-t-[1px] border-black">
          {!topic ? (
            <></>
          ) : (
            <Dropdown
              options={['배우', '가수', '캐릭터', '위인', '운동선수', '종합']}
              onChange={val => {
                setSelectTopic(PicTopicMatch[val]);
              }}
            />
          )}
          <p>작성된 문항 수: {countList.length}</p>
        </div>
        <ul>
          {countList?.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-center gap-x-16 rounded-xl w-[1000px] h-[400px] bg-hoverSkyBlue shadow-md mb-10"
            >
              <div className="w-[300px] h-[350px] p-4 outline-none text-center rounded-xl resize-none shadow-md bg-white">
                <label
                  htmlFor="file"
                  className="py-1 px-2 rounded-[10px] bg-skyBlue hover:bg-hoverSkyBlue active:bg-clickSkyBlue"
                >
                  사진 넣기
                </label>
                <p className="mt-2 text-gray3">{question[idx] ?? <br />}</p>
                <img
                  className="border-2 bg-gray1 border-black m-auto rounded-[8px] w-[250px] h-[250px] bg-cover"
                  src={viewImg[item]}
                  alt=""
                />

                <input
                  id="file"
                  className="absolute w-0 h-0 m-[-1px] p-0 overflow-hidden"
                  type="file"
                  accept="image/jpeg"
                  onChange={e => {
                    questionChangeHandler(e);
                  }}
                />
              </div>

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
                inputStyleType="PicQuiz"
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
