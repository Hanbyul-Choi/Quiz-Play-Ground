import { type FC, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { getUser, logout } from 'api/auth';
import { auth } from 'config/firebase';
import { loginStateStore, signUpStateStore, userStore } from 'store';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { useButtonColor } from '../../hooks/useButtonColor';

const Header: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  const { loginUser } = userStore();
  const uid = sessionStorage.getItem('userId');
  const name = sessionStorage.getItem('userName');
  const email = sessionStorage.getItem('userEmail');
  useEffect(() => {
    loginUser({ uid, email, name });
  }, []);

  // const logoutuser = async () => {
  //   if (userId === null) {
  //     try {
  //       await logout();
  //       sessionStorage.clear();
  //     } catch (error) {
  //       console.error('에러 발생');
  //     }
  //   }
  // };

  const { data } = useQuery('user', async () => await getUser(uid));
  console.log(data);

  const fetchUser = async () => {
    if (uid != null) {
      if (data !== undefined) {
        setUserName(data[0].userName as string);
      }
    } else {
      try {
        await logout();
        sessionStorage.clear();
      } catch (error) {
        console.error('에러 발생');
      }
    }
  };

  useEffect(() => {
    // logoutuser().catch(Error);
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    });
    fetchUser().catch(Error);
  }, [uid]);

  const initialColors = {
    join: 'text-white',
    login: 'text-white',
    addGame: 'text-white',
    myPage: 'text-white',
    logout: 'text-white'
  };

  const [colors, handleClick] = useButtonColor(initialColors);

  // Auth modal Store
  const isLoginModalOpen = loginStateStore(state => state.isModalOpen);
  const toggleLoginModal = loginStateStore(state => state.toggleModal);
  const isSignUpModalOpen = signUpStateStore(state => state.isModalOpen);
  const toggleSignUpModal = signUpStateStore(state => state.toggleModal);

  return (
    <>
      {isLoginModalOpen && <LoginModal />}
      {isSignUpModalOpen && <SignUpModal />}
      <div className="flex items-center justify-between p-2 px-8 bg-blue">
        <Link to={'/'}>
          <img src={'/assets/logo-playground.svg'} alt="Quiz-PlayGround" />
        </Link>
        <div className="flex gap-4">
          {isLogin ? (
            <>
              <button
                className={colors.join}
                onClick={() => {
                  toggleSignUpModal();
                }}
              >
                가입하기
              </button>
              <p className="text-white">|</p>
              <button
                className={colors.login}
                onClick={() => {
                  toggleLoginModal();
                }}
              >
                로그인
              </button>
            </>
          ) : (
            <>
              <p className="flex items-center mr-4 text-gray2 text-[13px]">{userName}님, 환영합니다!</p>
              <Link
                to={'/addgame'}
                className={colors.addGame}
                onClick={() => {
                  handleClick('addGame');
                }}
              >
                게임만들기
              </Link>
              <p className="text-white">|</p>
              <Link
                to={'/mypage'}
                className={colors.myPage}
                onClick={() => {
                  handleClick('myPage');
                }}
              >
                마이페이지
              </Link>
              <p className="text-white">|</p>
              <button
                className={colors.logout}
                onClick={() => {
                  logout().catch(error => {
                    error.errorHandler(error);
                    console.log('로그아웃 에러 발생');
                  });
                  sessionStorage.clear();
                  navigate('/');
                }}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
