type LabelProps = {
  children: React.ReactNode;
  name: string;
};

export const Label = ({ children, name }: LabelProps) => {
  return (
    <label className="text-xl" htmlFor={`${name}`}>
      {children}
    </label>
  );
};
