import React from 'react';

interface StyledBoxProps {
  children: React.ReactNode;
  className: string;
}

export const StyledBox = ({ children, className }: StyledBoxProps) => {
  return (
    <div className={className}>
      <div className="drop-shadow-none">{children}</div>
    </div>
  );
};
