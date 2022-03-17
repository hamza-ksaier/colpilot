import FILES from '../../constants/files';
import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg';
import Box from '../../assets/icons/Box.svg';
import bytesToSize from '../../utils/bytesToSize';
import { BsChevronDown } from "react-icons/bs";
import {HiOutlineTrash} from "react-icons/hi";

const Archived = () => {
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
       {FILES.filter((file) => file.isArchived === true)
       .map((file, ind) => { 
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         let d = new Date(file.createdAt);
         let type = undefined;
         if ((file.type === 'jpg') || (file.type ==='png') || (file.type === 'gif')) {
         type = image;
         }else if ((file.type === 'txt') || (file.type === 'pdf')) {
           type = File;
         } else {
           type = video;
         }
         return (
             <tr key={ind}>
             <td><img src = {type}/></td>
             <td>{`${file.name}.${file.type}`}</td>
             <td>{`${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}</td>
             <td>{bytesToSize(file.size)}</td>
             <td>
               <div className='buttons'>
                 <button className='delete-button'>
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
