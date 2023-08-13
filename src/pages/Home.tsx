import { Link } from 'react-router-dom';

import Button from 'components/shared/Button';

export const Home = () => {
  return (
    <div className="flex w-full ">
      <div>
        {/* <img src={homeImg} className="scale-50" /> */}
        <img
          src={'https://github.com/rmdkak/Quiz-Play-Ground/assets/92218638/5c33db9a-9f01-4c3c-9a33-0654f2548cf2'}
          className="min-h-screen lg:min-w-[600px] md:min-w-[300px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center ml-20 ">
        {/* <img src={e} className="max-w-[650px]" /> */}
        <h2 className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-[90px] text-skyBlue mb-[-25px]">
          QUIZ
        </h2>
        <h2 className="font-extrabold drop-shadow-[1px_4px_0px_rgba(0,0,0,1)] text-[90px] text-blue mb-[-25px] whitespace-nowrap">
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
