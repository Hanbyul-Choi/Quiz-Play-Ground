import { useState, useEffect } from 'react';

import { Input } from 'components/shared';
import Button from 'components/shared/Button';
import { Dropdown } from 'components/shared/Dropdown';

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

export const AddPictureGame = ({ topic, selectCategory }: Props) => {
  const [countList, setCountList] = useState<number[]>([0]);
  const [question, setQuestion] = useState<File[]>([]);
  const [answer, setAnswer] = useState<InputType[]>([{ text: '' }]);
  const [quiz, setQuiz] = useState<GameListType[]>([]);

  useEffect(() => {
    setCountList([0]);
    setQuestion([]);
    setAnswer([{ text: '' }]);
    setQuiz([]);
  }, [selectCategory]);

  // const questionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
  //   const files = e.target.files;
  //   if (files != null && files.length > 0) {
  //     setQuestion(prevQuestions => {
  //       const updateQuestions = [...prevQuestions];
  //       updateQuestions[idx] = files[0];
  //       return updateQuestions;
  //     });
  //   }
  //   // updateQuiz(idx, e.target.value.split('\\')[2], 'question');
  // };

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
    setQuestion([...question]);
    setAnswer([...answer, { text: '' }]);
  };

  return (
    <>
      <div>
        <div className="flex flex-col p-2 gap-y-2 border-t-[1px] border-black">
          {!topic ? (
            <></>
          ) : (
            <Dropdown
              options={['배우', '가수', '캐릭터', '역사 인물']}
              onChange={val => {
                console.log(val);
              }}
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
              <div className="w-[300px] h-[90px] p-4 outline-none text-center rounded-xl resize-none shadow-md bg-white">
                <label
                  htmlFor="file"
                  className="py-1 px-2 rounded-[10px] bg-skyBlue hover:bg-hoverSkyBlue active:bg-clickSkyBlue"
                >
                  사진 넣기
                </label>
                <p className="mt-2 text-gray3">{question[idx]?.name}</p>
                <input
                  id="file"
                  className="absolute w-0 h-0 m-[-1px] p-0 overflow-hidden"
                  type="file"
                  accept="image/jpeg, image/png"
                  // onChange={e => {
                  //   questionChangeHandler(e, idx);
                  // }}
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
      <Button buttonStyle="yellow md" onClick={() => {}}>
        작성 완료
      </Button>
    </>
  );
};
