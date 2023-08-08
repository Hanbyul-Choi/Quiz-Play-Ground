import { Routes } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto">
      {/* <Header /> */}
      <Routes>{children}</Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
