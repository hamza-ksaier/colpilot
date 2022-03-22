import {NavLink } from  'react-router-dom';
import logo from '../../assets/images/logo.svg';
import upload from '../../assets/icons/Upload.svg';
import home from '../../assets/icons/HomeMinimal.svg';
import File_img from '../../assets/icons/FileStructure.svg';
import starred from '../../assets/icons/Star.svg';
import archive from '../../assets/icons/Box.svg';
import { useState, useRef } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { nanoid } from 'nanoid';
import { addFile } from '../../store/slices/files';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Sidebar = () => {
  const [click , setClick] = useState(true);
  const fileRef = useRef();
  const {files} = useSelector((state) => state.files);
  const dispatch = useDispatch();
 

  const toggleClass = () => {
    setClick(!click);
    console.log(click);
  }
  // Add File 
  const handleChange = () => {
    console.log(fileRef.current.files);
    const newFiles =fileRef.current.files;
    let dataFiles=[];
    for(let i=0;i<newFiles.length;i++) {
      const {name,size,type}=newFiles[i];
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
    })}
    dispatch(
      addFile(dataFiles)
    );
  };
  // Error unavaible file
  const notify = (newFiles) => {
    if (newFiles.type === 'image/png') {
        toast.success('Produto removido com sucesso')
        console.log('TESTE')
    } else  {
        toast.error('Erro ao tentar remover produto')
    }
};
  return (<div className='sidebar'>
    <div className="logo">
      <img className={(click?"rotate":"rotate")} src={logo} onClick={toggleClass}/>
    </div>
      <button className='upload' onClick={() => {fileRef.current.click(); }}>
        <img className='upload-icon' src={upload}/>
        <div className='upload-text'>Upload</div>
        <input 
         id='byid'
         onClick={()=>notify()}
         type="file"
         ref={fileRef}
         onChange={handleChange}
         multiple
         hidden
         />
          <ToastContainer
            theme = 'dark' 
          />
        </button>
        <nav>
        <div className='menu'>
          <NavLink to = "/" className={isActive=> (isActive ?"active": "")}>
          <img  className='menu-img' src={home}/>
           <div className='menu-text'> Home</div> 
            </NavLink>
            <NavLink to = "/all-files" className={isActive=>  (isActive ? "active": "")}>
          <img  className='menu-img' src={File_img}/>
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
    </div>)
};
export default Sidebar;
