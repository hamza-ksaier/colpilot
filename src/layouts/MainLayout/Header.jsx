import search from '../../assets/icons/Search.svg';
import setting from '../../assets/icons/Settings.svg'
import notifications from '../../assets/icons/NotificationBell.svg';
import profil from '../../assets/images/user.png';

const Header = () => {
  return <div className='header'>
                <div className="search">
                  <img className="search-img" src={search} />
                  <input 
                  type="text"
                  placeholder="Search"
                  />
                </div>
                  <div className='preferences'>
                    <div className='setting'>
                      <img src={setting}/>
                      </div>
                      <div className='notifications'>
                        <img  src={notifications}/>
                        <div className='counter'>18</div>
                        </div>
                    <div className='profil'>
                      <div className='username'>Achref</div>
                      <img  src={profil} />
                    </div>
                  </div>

    </div>;
};

export default Header;
