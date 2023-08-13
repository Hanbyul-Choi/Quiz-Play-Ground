import { Link } from 'react-router-dom';

import homeImg from 'assets/homeImg.png';
import Button from 'components/shared/Button';

export const Home = () => {
  return (
    <div className="w-screen">
      <div className="absolute top-0 z-[-50] h-screen">
        <img src={homeImg} className="h-full" />
      </div>
      <div className="absolute top-[37%] left-[780px] mr-auto ml-[200px] flex-col items-center justify-center ">
        {/* <img src={Title} className="max-w-[650px]" /> */}
        <h2 className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-[90px] text-skyBlue mb-[-25px]">
          QUIZ
        </h2>
        <h2 className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-[90px] text-blue mb-[-25px]">
          PLAY GROUND
        </h2>
        <Link to={'/main'}>
          <div className="mt-[40px] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-[60px] max-w-fit">
            <Button buttonStyle="yellow lg">게임방 입장!</Button>
          </div>
        </Link>
        <p className="pt-[40px] text-gray3">
          과도한 게임은 뇌를 해칠 수 있습니다. 적당히 즐겨주세요. <br />
          음주 시 함께 하면 2배의 재미를 경험해보실 수 있습니다.
        </p>
      </div>
    </div>
  );
};
