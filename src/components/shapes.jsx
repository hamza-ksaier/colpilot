import { react, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { placeShape, transpose, flip } from '../store/slices/tetrominos';
import { cleanMatrix } from '../utils/cleanMatrix';
import './styles/shapes.css';
import numRows from '../utils/numberRows';
import numCols from '../utils/numberCols';



export function clickedShape(id) {
    return id;
}


export const Shapes = () => {

    const dispatch = useDispatch();
    const { tetrominos } = useSelector((state) => state.tetrominos);


    let tetros = tetrominos?.filter(tetro => tetro.id < 22)
    let tetros2 = tetrominos?.filter(tetro => tetro.id > 21 && tetro.id < 43)
    let tetros3 = tetrominos?.filter(tetro => tetro.id > 42 && tetro.id < 64)
    let tetros4 = tetrominos?.filter(tetro => tetro.id > 63)




    let tetro = tetros?.map(tet => tet.shape)
    let tetro2 = tetros2?.map(tet => tet.shape)
    let tetro3 = tetros3?.map(tet => tet.shape)
    let tetro4 = tetros4?.map(tet => tet.shape)


    const clickHandler = (num) => {
        dispatch(placeShape({ id: num }));
    }

    const keyPress = (e) => {
        if (e.key === 'r') {
            dispatch(transpose())
        } else if (e.key === 'f') {
            dispatch(flip())
        }
    }

    return (
        <>
            <div className="player1" >
                <div className="title">
                    <u>Player 1</u>
                </div>
                <div className="tetrominos">

                    {tetro?.map((shape, num) => {
                        console.log(cleanMatrix(shape))
                        const returnn = cleanMatrix(shape)?.map((rows, i) => {
                            return rows?.map((col, j) => {
                                if (col !== 0) {
                                    return <div key={j} className='case'></div>
                                }
                                return <div key={j}></div>
                            })
                        });

                        return <div id={num}
                            key={num}
                            onClick={() => clickHandler(num)}
                            onKeyDown={keyPress}
                            tabIndex="0"
                            style={{
                                display: 'grid',
                                gridTemplateRows: `repeat(${numRows(shape)}, 30px)`,
                                gridTemplateColumns: `repeat(${numCols(shape)
                                    }, 30px)`
                            }}>{returnn}</div>
                    })}
                </div>
            </div>

        </>
    );
}

export default Shapes;