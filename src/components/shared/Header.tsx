import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <div className="flex justify-between items-center p-2 px-8 bg-blue">
      <Link to={'/'}>
        <img src={'/assets/logo-playground.svg'} alt="Quiz-PlayGround" />
      </Link>
      <div className="flex gap-4">
        <button className="text-white">가입하기</button>
        <p className="text-white">|</p>
        <button className="text-white"> 로그인</button>
      </div>
    </div>
  );
};

export default Header;
