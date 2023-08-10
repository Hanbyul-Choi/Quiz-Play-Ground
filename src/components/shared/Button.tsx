import { type MouseEventHandler } from 'react';

interface ButtonProps {
  buttonStyle: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

type VariantsType = Record<string, string>;

const Button = ({ buttonStyle, children, onClick, ...props }: ButtonProps) => {
  const buttonStyleArr = buttonStyle.split(' ');
  let size: string = '';
  let full: string = '';

  const buttonDefault = 'text-black font-bold px-[10px] py-[5px]  shadow-lg';

  const colorVariants: VariantsType = {
    yellow: 'bg-yellow hover:bg-hoverYellow active:bg-clickYellow',
    blue: 'bg-skyBlue hover:bg-hoverSkyBlue active:bg-clickSkyBlue',
    disabled: 'bg-gray2'
  };

  const outlineVariants: VariantsType = {
    yellow: 'bg-white border-yellow border-2 text-yellow',
    gray1: 'bg-white border-gray1 border-2 text-gray3 hover:bg-gray1/50 active:bg-gray1/70',
    gray2: 'bg-white border-gray2 border-2 text-gray3 hover:bg-gray2/20 active:bg-gray2/50',
    gray3: 'bg-white border-gray3 border-2 text-gray3 hover:bg-gray3/20 active:bg-gray3/50'
  };

  const sizeFunc = () => {
    switch (buttonStyleArr[1]) {
      case 'xs':
        return (size = 'w-[65px] h-[35px] text-md rounded-[20px]');
      case 'sm':
        return (size = 'w-[110px] h-[35px] text-md rounded-[20px]');
      case 'md':
        return (size = 'w-[130px] h-[50px] text-lg rounded-xl');
      case 'lg':
        return (size = 'w-[330px] h-[115px] text-4xl rounded-xl');
      default:
        return (size = 'w-[110px] h-[35px] text-lg rounded-xl');
    }
  };
  sizeFunc();

  if (buttonStyleArr.includes('full')) {
    full = 'w-full';
  }

  if (props.disabled === true) {
    return (
      <button className={`${buttonDefault} ${colorVariants.disabled} ${size} ${full}`} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  return (
    <>
      {buttonStyleArr.includes('outlined') ? (
        <button
          className={`${buttonDefault} ${outlineVariants[buttonStyleArr[0]]} ${size} ${full}`}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      ) : (
        <button
          className={`${buttonDefault} ${colorVariants[buttonStyleArr[0]]} ${size} ${full}`}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

// 사용방법
// {
//   /* <Button
// buttonStyle="yellow sm"
// onClick={() => {}}
// >
// 작성
// </Button> */
// }
// {
//   /* <Button
// buttonStyle="gray2 md full outlined"
// onClick={() => {}}
// >
// +
// </Button> */
// }

// buttonStyle 작성 순서
// 1. color
// 2. size : xs, sm, md, lg

// (선택사항)
// 3. full(width 100%)
// 3. outlined
// 4. disabled
