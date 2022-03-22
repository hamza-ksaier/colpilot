import FILES from '../../constants/files';
import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg';
import Box from '../../assets/icons/Box.svg';
import File from '../../assets/icons/File.svg';
import bytesToSize from '../../utils/bytesToSize';
import { BsChevronDown } from "react-icons/bs";
import {HiOutlineTrash} from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { deleteArchivedFile } from '../../store/slices/files';

const Archived = () => {
  const dispatch = useDispatch();
  const {files} = useSelector((state)=> state.files);
  return <div className='archived'>
      <div className="show-case">
        <div className='logo-files'>
          <div className='allFiles-image'>
          <img src={Box}/>
          </div>
        <div className="title">
          <b>Archived Files</b>
        </div>
      </div>
     
      <div className="selection">
        <select id="date-size">
            <option value="Date">By Date</option>
            <option value="Size">By Size</option>
        </select>
          <BsChevronDown className='select-button'/> 
      </div>
    </div>
    
      <table>
       
       <tr>
         <th></th>
         <th>Name</th>
         <th>Date Created</th>
         <th>Size</th>
         <th>Actions</th>
       </tr>
       {files.filter((file) => file.isArchived === true)
       .map((file, ind) => { 
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
             <td><img src = {type}/></td>
             <td>{`${file.name}`}</td>
             <td>{`${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}</td>
             <td>{bytesToSize(file.size)}</td>
             <td>
               <div className='buttons'>
                 <button className='delete-button'
                 onClick={() => {
                   dispatch(deleteArchivedFile(file.id))
                 }}
                 >
                 <HiOutlineTrash className='trash'/>
                 </button>
                 </div>
               </td>
           </tr>
         )
       })}
     </table>
    </div>;
};

export default Archived;
