interface InputProps {
  inputStyleType: 'comment' | 'auth' | 'quiz' | 'answer';
  inputType: 'text' | 'textarea' | 'email' | 'password';
  holderMsg?: string;
  name?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  border: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  forwardRef?: React.MutableRefObject<HTMLInputElement | null>;
}

type InputConfigType = Record<string, string>;

const inputStyleConfig: InputConfigType = {
  comment: 'w-[400px] py-[5px] px-6 outline-none rounded-full shadow-md',
  auth: 'w-full py-[5px] px-6 outline-none rounded-full shadow-md',
  quiz: 'w-[300px] h-[90px] p-4 outline-none text-center rounded-xl resize-none shadow-md',
  answer: 'p-[5px] border-b-2 text-center outline-none'
};

export const Input = ({
  inputType,
  inputStyleType,
  holderMsg,
  name,
  id,
  onChange,
  value,
  border,
  disabled,
  autoFocus,
  forwardRef
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={`${inputType}`}
      className={`${inputStyleConfig[inputStyleType]} ${border ? 'border-[1px] border-gray4' : ''}`}
      placeholder={`${holderMsg ?? ''}`}
      onChange={onChange}
      value={value}
      disabled={disabled}
      autoFocus={autoFocus}
      ref={forwardRef}
    />
  );
};
