import { Link } from 'react-router-dom';

import Button from 'components/shared/Button';
import { activeButtonStore } from 'store';

const MyProfile = () => {
  const setActiveButton = activeButtonStore(state => state.setActiveButton);

  return (
    <div className="flex flex-col items-center ml-12">
      <div className="flex">
        <p className="text-right mr-4 mt-5 ">
          익명의 눈사람님, <br />
          오늘도 즐거운 게임하세요!
        </p>
        <div className="flex flex-col items-center ">
          <button>
            <img src={'./assets/DefaultProfile.svg'} alt="profileImage" />
          </button>
          <button>Edit</button>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Button buttonStyle="blue md" onClick={() => {}}>
          프로필 수정
        </Button>
        <Link to={`/addgame`}>
          <Button
            buttonStyle="yellow md"
            onClick={() => {
              setActiveButton('addGame');
            }}
          >
            게임 만들기
          </Button>
        </Link>
      </div>
      <div className="flex items-center mt-8 p-6 border border-black rounded-md shadow-lg">
        <div className="flex flex-col gap-2 mr-4">
          <p>ID</p>
          <p>닉네임</p>
        </div>
        <img src={'./assets/Line.svg'} />
        <div className="flex flex-col gap-2 ml-4">
          <p>snowman@snow.com</p>
          <p>익명의 눈사람</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
