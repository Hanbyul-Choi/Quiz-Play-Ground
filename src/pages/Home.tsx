import { Link } from 'react-router-dom';

import Button from 'components/shared/Button';

export const Home = () => {
  return (
    <>
      <div className="absolute top-[50%] left-[50%] -translate-x-center -translate-y-center">
        <Link to={'/main'}>
          <Button buttonStyle="yellow lg">게임방 입장!</Button>
        </Link>
      </div>
    </>
  );
};
