import {NavLink } from  'react-router-dom';
import logo from '../../assets/images/logo.svg';
import upload from '../../assets/icons/Upload.svg';
import home from '../../assets/icons/HomeMinimal.svg';
import files from '../../assets/icons/FileStructure.svg';
import starred from '../../assets/icons/Star.svg';
import archive from '../../assets/icons/Box.svg';
import { useState } from 'react';
import { BrowserRouter  } from "react-router-dom";

const Sidebar = () => {
  const [click , setClick] = useState(true);

  const toggleClass = () => {
    setClick(!click);
    console.log(click);
  }
  return <div className='sidebar'>
    <div className="logo">
      <img className={(click?"rotate":"rotate")} src={logo} onClick={toggleClass}/>
    </div>
      <button className='upload'>
        <img className='upload-icon' src={upload}/>
        <div className='upload-text'>Upload</div>
        </button>
        <nav>
        <div className='menu'>
          <NavLink to = "/" className={isActive=> (isActive ?"active": "")}>
          <img  className='menu-img' src={home}/>
           <div className='menu-text'> Home</div> 
            </NavLink>
            <NavLink to = "/all-files" className={isActive=>  (isActive ? "active": "")}>
          <img  className='menu-img' src={files}/>
           <div className='menu-text'> All Files</div> 
            </NavLink>
            <NavLink to = "/starred" className={isActive=> (isActive?"active": "")}>
          <img  className='menu-img' src={starred}/>
           <div className='menu-text'> Starred</div> 
            </NavLink>
            <NavLink to = "/archived" className={isActive=> (isActive?"active": "")}>
          <img  className='menu-img' src={archive}/>
           <div className='menu-text'> Archived</div> 
            </NavLink>
        </div>
        </nav>
    </div>;
};
export default Sidebar;
