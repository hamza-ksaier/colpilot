import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Sidebar />
      <div className='container'>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
