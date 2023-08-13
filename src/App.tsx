import { Route, Routes } from 'react-router-dom';

import { PictureGame, TextGame } from './components/games';
import Layout from './components/shared/Layout';
import { AddGame, Game, GameResult, Home, Main, MyPage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/main" element={<Main />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="/game/:category/:postid" element={<Game />} />
        <Route path="/gameresult/:postid" element={<GameResult />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/textgame/:category/:postid" element={<TextGame />} />
        <Route path="/picturegame/:category/:postid" element={<PictureGame />} />
      </Route>
    </Routes>
  );
};

export default App;
