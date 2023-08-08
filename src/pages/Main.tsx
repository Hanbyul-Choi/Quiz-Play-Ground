import { Dropdown } from '../components/shared/Dropdown';

export const Main = () => {
  return (
    <div className="text-black">
      home home home<div>drop test</div>
      <Dropdown options={['이어말하기', '넌센스퀴즈', '인물퀴즈']} onChange={value => console.log(value)} />
      home
    </div>
  );
};
