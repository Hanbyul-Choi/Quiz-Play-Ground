import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useButtonColor } from '../../hooks/useButtonColor';

const Header: FC = () => {
  const [isLogin] = useState(true);

  const initialColors = {
    join: 'text-white',
    login: 'text-white',
    addGame: 'text-white',
    myPage: 'text-white',
    logout: 'text-white'
  };

  const [colors, handleClick] = useButtonColor(initialColors);

  return (
    <div className="flex justify-between items-center p-2 px-8 bg-blue">
      <Link to={'/'}>
        <img src={'/assets/logo-playground.svg'} alt="Quiz-PlayGround" />
      </Link>
      <div className="flex gap-4">
        {isLogin ? (
          <>
            <button className={colors.join} onClick={() => handleClick('join')}>
              가입하기
            </button>
            <p className="text-white">|</p>
            <button className={colors.login} onClick={() => handleClick('login')}>
              로그인
            </button>
          </>
        ) : (
          <>
            <Link to={'/addgame'} className={colors.addGame} onClick={() => handleClick('addGame')}>
              게임만들기
            </Link>
            <p className="text-white">|</p>
            <Link to={'/mypage'} className={colors.myPage} onClick={() => handleClick('myPage')}>
              마이페이지
            </Link>
            <p className="text-white">|</p>
            <button className={colors.logout} onClick={() => handleClick('logout')}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
