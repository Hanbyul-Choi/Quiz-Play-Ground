type InputProps = {
  inputStyleType: 'comment' | 'auth' | 'quiz' | 'answer';
  inputType: 'text' | 'textarea';
  holderMsg?: string;
  name?: string;
};

type InputConfigType = {
  [key: string]: string;
};

const inputStyleConfig: InputConfigType = {
  comment: 'w-[400px] py-[5px] px-6 outline-none rounded-full shadow-md',
  auth: 'w-[500px] py-[5px] px-6 outline-none rounded-full shadow-md',
  quiz: 'w-[300px] h-[90px] p-4 outline-none text-center rounded-xl resize-none shadow-md',
  answer: 'p-[5px] border-b-2 text-center outline-none'
};

export const Input = ({ inputType, inputStyleType, holderMsg, name }: InputProps) => {
  return (
    <input
      id={`${name}`}
      type={`${inputType}`}
      className={`${inputStyleConfig[inputStyleType]}`}
      placeholder={`${holderMsg ?? ''}`}
    />
  );
};
