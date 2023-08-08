import { Route, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Header from './components/shared/Header';
import { PictureGame, TextGame } from './components/games';
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
         <Route path="/textgame/:category/:gameid" element={<TextGame />} />
      <Route path="/picturegame/:category/:gameid" element={<PictureGame />} />
      </Layout>
    </>
  );
}

export default App;
