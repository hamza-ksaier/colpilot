import documents from '../../assets/icons/File.svg';
import images from '../../assets/icons/Image.svg';
import videos from '../../assets/icons/Video.svg';
import bytesToSize from '../../utils/bytesToSize';
import { useSelector } from 'react-redux';

const Statistics = () => {
    const {files} = useSelector((state)=> state.files);
    const sizeFile = (type) => { 
        return  (files.filter(file=> file.type.includes(type))
      .map((file) => file.size )
      .reduce((size,acc) => size + acc , 0));
      }
      const sizeDoc = (sizeFile('application'|| 'plain' || 'text'))
return ( 
<div className="statistics">
{/* card Documents  */}
<div className="card">
<div className="logo-card">
<img src={documents}/>    
</div>
<div className='name-card'>
    Documents  
</div>
<div className='last-part'>
<div className='progress'>
    <div class="progress-value" style={{ 'width':  (sizeDoc/(5e+6)*100).toFixed(2)+ '%'}}></div>
    </div>
    <div className='final-row'>
        <div className="percentage"  >
            {((sizeDoc /(5e+6)*100)).toFixed(2)}%
        </div>
        <div className='size'>
             {bytesToSize(sizeDoc)} of 5mb Used
        </div>
    </div>
    
</div>
    
    
</div>
{/* card Images  */}
<div className="card">
<div className="logo-card-image">
<img src={images}/>    
</div>
<div className='name-card'>
    Images
</div>
<div className='last-part'>
<div class="progress">
    <div class="progress-value-images" style={{ 'width':  (sizeFile('image')/(5e+7)*100).toFixed(2)+ '%'}}></div>
    </div>
    <div className='final-row'>
        <div className="percentage">
            {(sizeFile('image')/(5e+7)*100).toFixed(2)}%
        </div>
        <div className='size'>
            {bytesToSize(sizeFile('image'))} of 50mb Used
        </div>
    </div>
    
</div>
</div>

{/* card videos  */}
<div className="card">
<div className="logo-card-video">
<img src={videos}/>    
</div>
<div className='name-card'>
    Videos
</div>
<div className='last-part'>
<div class="progress">
    <div class="progress-value-videos" style={{ 'width':  (sizeFile('video')/(5e+9)*100).toFixed(2)+ '%'}}></div>
    </div>
    <div className='final-row'>
        <div className="percentage">
        {(sizeFile('video')/(5e+9)*100).toFixed(2)}%
        </div>
        <div className='size'>
            {bytesToSize(sizeFile('video'))} of 50gb Used
        </div>
    </div>
    
</div>
</div>


</div>
);
}
 
export default Statistics;