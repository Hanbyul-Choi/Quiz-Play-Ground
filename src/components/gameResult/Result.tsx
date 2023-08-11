import { Link } from 'react-router-dom';

const Result = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="text-[30px] mb-4">게임결과</div>
      <div className="flex flex-col justify-center items-center w-[450px] h-[400px] bg-hoverSkyBlue rounded-xl relative">
        <p className="mb-16 text-[20px]">선택한 제한시간: 3초</p>
        <div className="w-[350px] h-7 rounded-full bg-gray2 mb-16">
          <div className="w-[70%] h-full rounded-full bg-green"></div>
        </div>
        <p className="mb-4 text-[18px]">17문제를 맞추셨군요!</p>
        <Link to={'/main'}>
          <p className="text-[18px]">다른 게임에도 도전해보세요. Click !</p>
        </Link>
        <div className="absolute flex gap-1 bottom-4 right-4">
          <button>
            <img src={'./assets/LikeOutlined.svg'} alt="like" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
