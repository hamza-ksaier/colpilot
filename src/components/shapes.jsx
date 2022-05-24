import { react, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { placeShape } from '../store/slices/tetrominos';
import './styles/shapes.css';



export  function clickedShape(id) {
    return id;
}


export const Shapes = ({ childToParent }) => {

    const dispatch = useDispatch();
    const { TETROMINOS } = useSelector((state) => state.tetrominos);

    
    let tetros = TETROMINOS.filter(tetro => tetro.isPlaced === false )
    let tetro = tetros.map(tet => tet.shape)
    console.log(tetro);
  
    return (
        <>
            <div className="player1" >
                <div className="title">
                    <u>Player 1</u>
                </div>
                <div className="tetrominos">
                    {tetro.map((shape, num) => {

                            const returnn = shape.map((rows, i) => {
                                return rows.map((col, j) => {
                                    if (col !== 0 ) {
                                        return <div className='case'></div>
                                    }
                                    return <div></div>
                                })
                            });
                        return <div id={num} onClick={() => dispatch(placeShape(num))} style={{
                                display: 'grid', gridTemplateRows: `repeat(${shape.length}, 30px)`, gridTemplateColumns: `repeat(${5}, 30px)`

                            }}>{returnn}</div>
                                                   
                    })}
                </div>

            </div>
        </>
    );
}

export default Shapes;