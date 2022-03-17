
import FILES from '../../constants/files';
import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg';
import File from '../../assets/icons/File.svg';
import bytesToSize from '../../utils/bytesToSize';
import starred from '../../assets/icons/Star.svg';
import {NavLink } from  'react-router-dom';


const RecentFiles = () => {
    return (
        <div className="recentFiles">
            <div className="files">
                <div className="title">
                Recent Files 
                </div>
                <table>
       <tr>
         <th></th>
         <th>Name</th>
         <th>Date Created</th>
         <th>Size</th>
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
           </tr>
         )
       })}
     </table>
            </div>
            <div className='information-files'>
            <div className='starred-files'>
            <div className='logo-files'>
                    <img src={starred}/>
              </div>
              <div className="title">
                  4  Starred Files
             </div>
          </div>
             <div className='view-file'> 
             <NavLink to="/starred" > Go to view</NavLink>
             </div>
            
              </div>
            <div className='archived-files'>
               </div>
            </div>
      
    )
}
export default RecentFiles;