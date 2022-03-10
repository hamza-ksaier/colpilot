import {NavLink } from  'react-router-dom';
import logo from '../../assets/images/logo.svg';
import upload from '../../assets/icons/Upload.svg';
import home from '../../assets/icons/HomeMinimal.svg';
import files from '../../assets/icons/FileStructure.svg';
import starred from '../../assets/icons/Star.svg';
import archive from '../../assets/icons/Box.svg';
import { useState } from 'react';

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
        
        <div className={ (click?"menu": "hidden")}>
          <NavLink to = "home" className={isActive=> (isActive?"active": "")}>
          <img  className='menu-img' src={home}/>
           <div className='menu-text'> Home</div> 
            </NavLink>
            <NavLink to = "files" className={isActive=> (isActive?"active": "")}>
          <img  className='menu-img' src={files}/>
           <div className='menu-text'> All Files</div> 
            </NavLink>
            <NavLink to = "starred" className={isActive=> (isActive?"active": "")}>
          <img  className='menu-img' src={starred}/>
           <div className='menu-text'> Starred</div> 
            </NavLink>
            <NavLink to = "archive" className={isActive=> (isActive?"active": "")}>
          <img  className='menu-img' src={archive}/>
           <div className='menu-text'> Archived</div> 
            </NavLink>

        </div>

        
    </div>;
};

export default Sidebar;
