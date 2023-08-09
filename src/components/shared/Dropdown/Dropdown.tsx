import React, { useRef, useState } from 'react';

import { useBoolean, useClickAway } from '../../../hooks';

interface DropdownProps {
  options: string[];
  selected?: number;
  size?: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, selected, onChange, size = 'md' }) => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const containerRef = useRef(null);

  const selectOption = (option: string) => {
    if (option.length === 0) return;
    setSelectedOption(option);
    setIsOpen.off();
    onChange(option);
  };
  useClickAway({ ref: containerRef, callback: setIsOpen.off });

  return (
    <div className="relative min-w-[100px]" ref={containerRef}>
      <button
        className="flex justify-center border-[2px] min-w-[100px] border-gray4 rounded-lg p-[4px]"
        onClick={setIsOpen.toggle}
      >
        {selected !== undefined ? options[selected - 1] : selectedOption === null ? '선택하세요' : selectedOption} ▼
      </button>
      {isOpen && (
        <ul className="absolute flex-col min-w-[100px] items-center bg-slate-50 z-10 mt-[5px] border-[2px] border-gray4 rounded-lg overflow-hidden">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option flex justify-center bg-slate-50 cursor-pointer w-full border-b-[1px] p-[2px] border-b-gray4 hover:bg-gray2"
              onClick={() => {
                selectOption(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
