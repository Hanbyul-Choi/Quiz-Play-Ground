import CommentList from '../components/gameResult/CommentList';
import Result from '../components/gameResult/Result';

export const GameResult = () => {
  return (
    <div className="flex items-start justify-center" style={{ marginTop: '18vh' }}>
      <Result />
      <CommentList />
    </div>
  );
};
