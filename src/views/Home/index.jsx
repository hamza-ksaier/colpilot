import RecentFiles from "./Recents_files";
import Statistic from "./statistics";
const Home = () => {
  return <div className='home'>
    <Statistic/>
    <RecentFiles/>
    </div>;
};

export default Home;
