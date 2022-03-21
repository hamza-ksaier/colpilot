import FILES from '../../constants/files';
import image from '../../assets/icons/Image.svg';
import video from '../../assets/icons/Video.svg'; 
import File from '../../assets/icons/File.svg'; 
import bytesToSize from'../../utils/bytesToSize'; 
import starred from '../../assets/icons/Star.svg'; 
import archived from '../../assets/icons/Box.svg';
import {NavLink } from 'react-router-dom'; 

const RecentFiles = () => { return (
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
            {FILES.map((file, ind) => { const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]; let d = new Date(file.createdAt); let type = undefined; if
            (file.name.startsWith('image')) { type = image; }else if (file.name.startsWith('file')) { type = File; } else { type = video; } return (
            <tr key={ind}>
                <td><img src={type} /></td>
                <td>{`${file.name}.${file.type}`}</td>
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
                    4 Starred Files
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
                   0 Archived Files
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
