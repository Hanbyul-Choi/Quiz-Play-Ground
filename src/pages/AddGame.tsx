import { useState } from 'react';

import { Input } from 'components/shared';
import Button from 'components/shared/Button';
import { Dropdown } from 'components/shared/Dropdown';

interface Test {
  id: number;
  question: string;
  answer: string;
}

export const AddGame = () => {
  const [countList, setCountList] = useState<number[]>([0]);
  const [question, setQuestion] = useState([{ text: '' }]);
  const [answer, setAnswer] = useState([{ text: '' }]);
  const [quiz, setQuiz] = useState<Test[]>([]);

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

  return (
    <div className="flex flex-col items-center w-[1000px] font-medium gap-y-16">
      <div className="flex items-start w-full p-2 mt-8 gap-x-10">
        <Dropdown
          options={['이어 말하기', '넌센스 퀴즈', '인물 퀴즈', '신조어 퀴즈']}
          onChange={val => {
            console.log(val);
          }}
        />
        <Input inputType="text" inputStyleType="auth" holderMsg="제목을 입력해주세요." />
      </div>
      <ul className="w-full list-disc list-inside text-start text-gray3">
        <li>최소 문항 수는 5개입니다.</li>
        <li>상대방에게 불쾌한 인식을 주는 문제는 관리자에 의해 언제든 삭제될 수 있음을 알려드립니다.</li>
        <li>중복된 문제가 있을 시 관련 문항은 삭제될 수 있습니다.</li>
      </ul>
      <div>
        <div className="flex flex-col p-2 gap-y-2 border-t-[1px] border-black">
          <Dropdown
            options={['속담', '사자성어', '일상 단어']}
            onChange={val => {
              console.log(val);
            }}
          />
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
    </div>
  );
};
