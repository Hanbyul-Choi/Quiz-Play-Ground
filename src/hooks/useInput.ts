import { useState } from 'react';

export const useInput = (init = '') => {
  const [value, setValue] = useState(init);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onSet = (val: any) => {
    setValue(val);
  };

  return [value, onChange, onSet];
};

// const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
//   let value = initialValue;

//   const setValue = (newValue: T) => {
//     value = newValue;
//   };

//   return [value, setValue];
// };
