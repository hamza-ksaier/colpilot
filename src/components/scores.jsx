import { useSelector } from 'react-redux';



const Scores = () => {
    const {  score1, score2, score3, score4 } = useSelector((state) => state.tetrominos);

    return ( 
        <>
                <div className="scores">Scores</div>
            <div className="score1">
                Player 1 : {score1}
        </div>
            <div className="score2">
                Player 2 : {score2}
            </div>
            <div className="score3">
                Player 3 : {score3}
            </div>
            <div className="score4">
                Player 4 : {score4}
            </div>

        </>
     );
}
 
export default Scores;
