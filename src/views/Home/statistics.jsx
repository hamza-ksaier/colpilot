import documents from '../../assets/icons/File.svg';
import images from '../../assets/icons/Image.svg';
import videos from '../../assets/icons/Video.svg';

const Statistics = () => {
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
                <div class="progress">
                    <div class="progress-value"></div>
                    </div>
                    <div className='final-row'>
                        <div className="percentage">
                            29%
                        </div>
                        <div className='size'>
                            23gb of 80gb Used
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
                    <div class="progress-value-images"></div>
                    </div>
                    <div className='final-row'>
                        <div className="percentage">
                            29%
                        </div>
                        <div className='size'>
                            23gb of 80gb Used
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
                  Images
                </div>
                <div className='last-part'>
                <div class="progress">
                    <div class="progress-value-videos"></div>
                    </div>
                    <div className='final-row'>
                        <div className="percentage">
                            29%
                        </div>
                        <div className='size'>
                            23gb of 80gb Used
                        </div>
                    </div>
                    
                </div>
            </div>


        </div>
     );
}
 
export default Statistics;