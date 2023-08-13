import MyGame from 'components/mypage/MyGame';
import MyProfile from 'components/mypage/MyProfile';

export const MyPage = () => {
  return (
    <div className="flex items-start justify-center" style={{ marginTop: '18vh' }}>
      <MyGame />
      <MyProfile />
    </div>
  );
};
