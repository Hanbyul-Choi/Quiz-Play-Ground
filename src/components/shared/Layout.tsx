import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col w-full max-w-screen-lg mx-auto">
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
