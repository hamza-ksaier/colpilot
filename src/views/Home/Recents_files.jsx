import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg'; 
import File from '../../assets/icons/File.svg'; 
import bytesToSize from'../../utils/bytesToSize'; 
import starred from '../../assets/icons/Star.svg'; 
import archived from '../../assets/icons/Box.svg';
import {NavLink } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 

const RecentFiles = () => {
    const {files} = useSelector((state) => state.files);
    const counterSt = (files.filter((file) => 
    file.isStarred === true)).length;
    const counerAt = (files.filter((file) => 
    file.isArchived === true)).length;
    return (
<div className="recentFiles">
<div className="files">
    <div className="title">
        <b>Recent Files</b>
    </div>
    <table>
        <tr>
            <th></th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Size</th>
        </tr>
        {files.slice(0,5).map((file, ind) => { const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
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
            <td><img src={type} /></td>
            <td>{`${file.name}`}</td>
            <td>{`${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}</td>
            <td>{bytesToSize(file.size)}</td>
        </tr>
        ) })}
    </table>
      
    </div>
    <div className="information-files">
        <div className="starred-archived">
            <div className="logo-files-starred">
                <img src={starred} />
            </div>
            <div className="title-description">
                <div className="title">
                    {counterSt} Starred Files
                </div>
                <div className="view-file">
                    <NavLink to="/starred"> Go to view</NavLink>
                </div>
            </div>
        </div>

        <div className="starred-archived">
            <div className="logo-files-archived">
                <img src={archived} />
            </div>
            <div className="title-description">
                <div className="title">
                   {counerAt} Archived Files
                </div>
                <div className="view-file">
                    <NavLink to="/archived"> Go to view</NavLink>
                </div>
            </div>
        </div>
    </div>
</div>

) } 
export default RecentFiles;
