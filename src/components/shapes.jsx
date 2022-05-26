import { react, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { placeShape, transpose, flip } from '../store/slices/tetrominos';
import './styles/shapes.css';


export function clickedShape(id) {
    return id;
}


export const Shapes = ({ childToParent }) => {

    const dispatch = useDispatch();
    const { tetrominos } = useSelector((state) => state.tetrominos);
    let matrix = [
        [0,0,0,0,0],
        [0,11,0,0,0],
        [11,11,11,0,0]
    ]; 



    let tetros = tetrominos?.filter(tetro => tetro)

    let tetro = tetros?.map(tet => tet.shape)
    const clickHandler = ( num) => {
        dispatch(placeShape({ id: num }));
       
    }  

    const keyPress = (e) => {
      if (e.key === 'r' ){
          dispatch(transpose())
      }else  if (e.key === 'f'){
          dispatch(flip())
      }
    }
    let matrice = [
        [0,0,11,11,11],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]


    return (
        <>
            <div className="player1" >
                <div className="title">
                    <u>Player 1</u>
                </div>
                <div className="tetrominos">

                    {tetro?.map((shape, num) => {
                        const returnn = shape?.map((rows, i) => {
                            return rows?.map((col, j) => {
                                if (col !== 0) {
                                    return <div className='case'></div>
                                }
                                return <div></div>
                            })
                        });
                        return <div id={num}
                         onClick={() => clickHandler(num)} 
                        onKeyDown={keyPress}
                        tabIndex="0"
                        // onContextMenu={(e)=>contextMenu(e)}
                            style={{
                                display: 'grid',
                                gridTemplateRows: `repeat(${shape.length}, 30px)`,
                                gridTemplateColumns: `repeat(${5}, 30px)`
                            }}>{returnn}</div>

                    })}


                </div>

            </div>
        </>
    );
}

export default Shapes;