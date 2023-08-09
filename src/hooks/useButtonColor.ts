import { useState } from 'react';

interface ButtonColors {
  join: string;
  login: string;
  addGame: string;
  myPage: string;
  logout: string;
}

export const useButtonColor = (initialColors: ButtonColors) => {
  const [colors, setColors] = useState(initialColors);

  const handleClick = (button: keyof ButtonColors) => {
    const newColors = { ...initialColors, [button]: colors[button] === 'text-white' ? 'text-gray3' : 'text-white' };
    setColors(newColors);
  };

  return [colors, handleClick] as const;
};
