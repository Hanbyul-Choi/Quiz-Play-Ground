import Comment from '../components/gameResult/Comment';
import Result from '../components/gameResult/Result';

export const GameResult = () => {
  return (
    <div className="flex justify-center items-start" style={{ marginTop: '18vh' }}>
      <Result />
      <Comment />
    </div>
  );
};
