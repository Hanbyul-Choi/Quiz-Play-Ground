import { Route, Routes } from 'react-router-dom';
import Header from './components/shared/Header';
import { AddGame, Game, GameResult, Home, Main, MyPage } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="/game/:category/:gameid" element={<Game />} />
        <Route path="/gameresult" element={<GameResult />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
