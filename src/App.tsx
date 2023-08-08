import { Route, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import { AddGame, Game, GameResult, Home, Main, MyPage } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Layout>
        <Route path="/main" element={<Main />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="/game/:category/:gameid" element={<Game />} />
        <Route path="/gameresult" element={<GameResult />} />
        <Route path="/mypage" element={<MyPage />} />
      </Layout>
    </>
  );
}

export default App;
