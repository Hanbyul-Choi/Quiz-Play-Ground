import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="flex flex-col w-full max-w-screen-lg mx-auto">
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
