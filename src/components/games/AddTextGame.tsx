import { useState } from 'react';

import { Input } from 'components/shared';

interface Props {
  countList: number[];
  setCountList: React.Dispatch<React.SetStateAction<number[]>>;
}

interface Test {
  id: string;
  prob: string;
  answer: string;
}

export const AddTextGame = ({ countList, setCountList }: Props) => {
  const [test, setTest] = useState<Test>({ id: '', prob: '', answer: '' });

  const deleteDiv = (item: number) => {
    const afterDeleteDiv = countList.filter(el => el !== item);
    setCountList(afterDeleteDiv);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, id } = e.target;
    setTest({ ...test, ...{ id, [name]: value } });
  };

  console.log(test);
  return (
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
            onChange={changeHandler}
            id={`${idx}`}
            name="prob"
          />
          {item !== 0 ? (
            <button
              className="relative w-4 bottom-[38%] left-[48%]"
              onClick={() => {
                deleteDiv(item);
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
            onChange={changeHandler}
            id={`${idx}`}
            name="answer"
          />
        </li>
      ))}
    </ul>
  );
};
// const [questions, setQuestions] = useState([{ text: '' }]);

// const handleQuestionChange = (event: any, index: any): void => {
//   const updatedQuestions = [...questions];
//   updatedQuestions[index].text = event.target.value;
//   setQuestions(updatedQuestions);
// };

// const addQuestion = () => {
//   setQuestions([...questions, { text: '' }]);
// };

// console.log(questions);
// return (
//   <div>
//     <h2>Quiz Question Creation</h2>
//     {questions.map((question, index) => (
//       <div key={index}>
//         <input
//           type="text"
//           placeholder="Enter a question"
//           value={question.text}
//           onChange={event => {
//             handleQuestionChange(event, index);
//           }}
//         />
//       </div>
//     ))}
//     <button onClick={addQuestion}>Add Question</button>
//   </div>
// );
