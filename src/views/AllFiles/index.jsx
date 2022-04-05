import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg';
import File from '../../assets/icons/File.svg';
import bytesToSize from '../../utils/bytesToSize';
import starred from '../../assets/icons/Star.svg';
import archived from '../../assets/icons/Box.svg';
import allFiles from '../../assets/icons/FileStructure.svg';
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { starredFile, archivedFile } from '../../store/slices/files';
import {useState, useEffect} from 'react';
// import { set } from 'immer/dist/internal';


const AllFiles = () => {
  const dispatch = useDispatch();
  const {files} = useSelector((state) => state.files);
  const [NEWfiles, setNewFiles] = useState(files);
  useEffect(() => {
    setNewFiles(files);
  }, [files]);



  function handleSort(e) {
    if (e.target.value === 'name') {
      setNewFiles(
        NEWfiles.slice().sort(function(a, b) {
          console.log(new Date(a.createdAt) - new Date(b.createdAt))
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        })
      )
    }
    if (e.target.value === 'size') {
      setNewFiles(
        NEWfiles.slice().sort(function(a, b){
          return a.size - b.size 
        })
      )
    }
     if (e.target.value === 'date') {
      setNewFiles(
        NEWfiles.slice().sort(function(a, b){
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
      )
    }
  }
  const [isClick , setIsclick] = useState(false);
  const handleClick = () => {
    setIsclick(!isClick)
  }
  return <div className='all-files'>
  <div className="show-case">
        <div className='logo-files'>
        <div className='allFiles-image'>
          <img src={allFiles}/>
        </div>
        <div className="title">
          <b>All Files</b>
        </div>
    </div>
     
      <div className="selection">
        <select id="date-size" onChange={handleSort} onClick={handleClick}>
            <option value="date">By Date</option>
            <option value="size">By Size</option>
            <option value="name">By Name</option>
        </select>
          <BsChevronDown className='select-button'/> 
      </div>
  </div>
  <div>
      <table>
       
        <tr>
          <th></th>
          <th>Name</th>
          <th>Date Created</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
        {NEWfiles.map((file, ind) => {
          const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          let d = new Date(file.createdAt);
          let type = undefined;
          if (file.type.includes('image') ) {
            type = image;
            }else if (file.type.includes('video')) {
              type = video;
            } else {
              type = File;
            }
          return (
              <tr key={ind}>
              <td><img src = {type}/>
             <div className='showStAt'>
              {file.isStarred && <div className={'showSt'}></div>}
              {file.isArchived && <div className={'showAt'}></div>}
              </div>

              <div className={(file.isArchived && file.isStarred) ? 'showStAt2' : ''}></div>
              </td>
              <td>{`${file.name}`}</td>
              <td>{`${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}</td>
              <td>{bytesToSize(file.size)}</td>
              <td>
                <div className='buttons'>
                <button className={!file.isStarred? 'starred-button': 'noSelected-button'}
                onClick={()=>{ dispatch(starredFile(file.id))}}
                >
                  <img src={starred}/>
                  </button>
                  <button className={!file.isArchived? 'archived-button': 'noSelected-button'}
                  onClick={()=>{dispatch(archivedFile(file.id))}}
                  >
                  <img src={archived}/>
                  </button>
                  
                  </div>
                </td>
            </tr>
          )
        })}
      </table>
      </div>
      </div>
  
};

export default AllFiles;
