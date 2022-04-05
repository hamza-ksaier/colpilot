import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import upload from '../../assets/icons/Upload.svg';
import home from '../../assets/icons/HomeMinimal.svg';
import File_img from '../../assets/icons/FileStructure.svg';
import starred from '../../assets/icons/Star.svg';
import archive from '../../assets/icons/Box.svg';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addFile } from '../../store/slices/files';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bytesToSize from '../../utils/bytesToSize';

const Sidebar = () => {
  const fileRef = useRef();
  const { files } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  // Add File 
   const handleChange = () => {
    const newFiles =fileRef.current.files;
    let dataFiles=[];

    for(let i=0;i<newFiles.length;i++) {
      const {name,size,type}=newFiles[i];
      const sizeFile = (type) => { 
        return size +  (files.filter(file=> file.type.includes(type))
      .map((file) => file.size )
      .reduce((size,acc) => size + acc , 0));
      }
      
     const  verifySize = (type) => {
       if (type='image'){
        return(size+ (sizeFile(type))> (5e+7))

       }else if (type = 'video'){
         return  (size+ sizeFile(type) > (5e+9))
       }else {
         return (size+ sizeFile(type) > (5e+6))
       }
     }
     dataFiles.push({
      id:nanoid(10),
      name,
      type,
      size,
      createdAt:new Date(Date.now()).toString(),
      isStarred: false,
      starredAt: null,
      isArchived: false,
      archivedAt: null,
    })
    {
    
        // Condition to Type 
    const verifyType = (!type.includes ('image' || 'text' 
    || 'application' || 'Video' || 'plain'  ) && !type) ;
    // adding file 
        if (verifyType){
        toast.error('This Type is not supported')
      }else if (verifySize(type))    {
        toast.error('Size is not supported');
      } else {
          dispatch(
          addFile(dataFiles)) 
      }
    }
  }};

 // informations (type, size) of files
 const typeDoc = ['application', 'plain', 'text']; 
  return (<div className='sidebar'>

    <div className="logo">
      <img src={logo} />
    </div>
    <button className='upload' onClick={() => { fileRef.current.click() }}>
      <img className='upload-icon' src={upload} />
      <div className='upload-text'>Upload</div>
      <input
        id='byid'

        type="file"
        ref={fileRef}
        onChange={handleChange}
        multiple
        hidden
      />
    </button>
    <nav>
      <div className='menu'>
        <NavLink to="/" className={isActive => (isActive ? "active" : "")}>
          <img className='menu-img' src={home} />
          <div className='menu-text'> Home</div>
        </NavLink>
        <NavLink to="/all-files" className={isActive => (isActive ? "active" : "")}>
          <img className='menu-img' src={File_img} />
          <div className='menu-text'> All Files</div>
        </NavLink>
        <NavLink to="/starred" className={isActive => (isActive ? "active" : "")}>
          <img className='menu-img' src={starred} />
          <div className='menu-text'> Starred</div>
        </NavLink>
        <NavLink to="/archived" className={isActive => (isActive ? "active" : "")}>
          <img className='menu-img' src={archive} />
          <div className='menu-text'> Archived</div>
        </NavLink>
      </div>
    </nav>
  </div>)
};

export default Sidebar;
