import { playTurn } from '../store/slices/tetrominos';
import { useDispatch } from 'react-redux';
import './styles/restart.css';


const Restart = () => {
    const dispatch = useDispatch();
    return (
        <>
            <button onClick={() => window.location.reload(false)} className='restartButton'>Restart</button>
            <button onClick={() => dispatch(playTurn())} className='skipturnButton'>Skip Turn</button>
        </>

    );
}

export default Restart;
