import { useDialog } from 'components/shared/Dialog';
import { useEffect } from 'react';
import { Dropdown } from '../components/shared/Dropdown';

export const Main = () => {
  const { Alert, Confirm } = useDialog();
  useEffect(() => {
    const test = async () => {
      const iswork = await Confirm('컨펌');
      if (iswork) {
        Alert('알림!');
      }
    };
    test();
  });

  return (
    <div className="text-black">
      home home home<div>drop test</div>
      <Dropdown options={['이어말하기', '넌센스퀴즈', '인물퀴즈']} onChange={value => console.log(value)} />
      home
    </div>
  );
};
