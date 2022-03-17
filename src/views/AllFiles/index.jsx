import FILES from '../../constants/files';
import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg';
import File from '../../assets/icons/File.svg';
import bytesToSize from '../../utils/bytesToSize';
import starred from '../../assets/icons/Star.svg';
import archived from '../../assets/icons/Box.svg';
import allFiles from '../../assets/icons/FileStructure.svg';
import { BsChevronDown } from "react-icons/bs";
const AllFiles = () => {
  return <div className='all-files'>
  <div className="show-case">
        <div className='logo-files'>
        <div className='allFiles-image'>
          <img src={allFiles}/>
        </div>
        <div className="title">
          <b>All Files </b>
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
  <div>
      <table>
       
        <tr>
          <th></th>
          <th>Name</th>
          <th>Date Created</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
        {FILES.map((file, ind) => {
          const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          let d = new Date(file.createdAt);
          let type = undefined;
          if (file.name.startsWith('image')) {
          type = image;
          }else if (file.name.startsWith('file')) {
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
                <button className='starred-button'>
                  <img src={starred}/>
                  </button>
                  <button className='archived-button'>
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
