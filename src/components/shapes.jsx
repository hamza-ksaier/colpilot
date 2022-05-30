import { react, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { placeShape, transpose, flip } from '../store/slices/tetrominos';
import './styles/shapes.css';


export function clickedShape(id) {
    return id;
}


export const Shapes = () => {

    const dispatch = useDispatch();
    const { tetrominos } = useSelector((state) => state.tetrominos);


    let tetros = tetrominos?.filter(tetro => tetro.id < 22)
    let tetros2 = tetrominos?.filter(tetro => tetro.id > 21 && tetro.id<43)
    let tetros3 = tetrominos?.filter(tetro => tetro.id > 42 && tetro.id <64)
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
                            style={{
                                display: 'grid',
                                gridTemplateRows: `repeat(${shape.length}, 30px)`,
                                gridTemplateColumns: `repeat(${5}, 30px)`
                            }}>{returnn}</div>
                    })}
                </div>
            </div>
            {/* // player2 */}
            <div className="player2" >
                <div className="title">
                    <u>Player 2</u>
                </div>

                <div className="tetrominos">

                    {tetro2?.map((shape, num) => {
                        const returnn = shape?.map((rows, i) => {
                            return rows?.map((col, j) => {
                                if (col !== 0) {
                                    return <div className='case2'></div>
                                }
                                return <div></div>
                            })
                        });
                        return <div id={num + 22}
                            onClick={() => clickHandler(num + 22)}
                            onKeyDown={keyPress}
                            tabIndex="0"
                            style={{
                                display: 'grid',
                                gridTemplateRows: `repeat(${shape.length}, 30px)`,
                                gridTemplateColumns: `repeat(${5}, 30px)`
                            }}>{returnn}</div>

                    })}


                </div>

            </div>
            {/* player 3 */}
            <div className="player3" >
                <div className="title">
                    <u>Player 3</u>
                </div>

                <div className="tetrominos">
                    {tetro3?.map((shape, num) => {
                        const returnn = shape?.map((rows, i) => {
                            return rows?.map((col, j) => {
                                if (col !== 0) {
                                    return <div className='case3'></div>
                                }
                                return <div></div>
                            })
                        });
                        return <div id={num + 43}
                            onClick={() => clickHandler(num + 43)}
                            onKeyDown={keyPress}
                            tabIndex="0"
                            style={{
                                display: 'grid',
                                gridTemplateRows: `repeat(${shape.length}, 30px)`,
                                gridTemplateColumns: `repeat(${5}, 30px)`
                            }}>{returnn}</div>
                    })}
                </div>
            </div>
            {/* player 4 */}
            <div className="player4" >
                <div className="title">
                    <u>Player 4</u>
                </div>

                <div className="tetrominos">

                    {tetro4?.map((shape, num) => {
                        const returnn = shape?.map((rows, i) => {
                            return rows?.map((col, j) => {
                                if (col !== 0) {
                                    return <div className='case4'></div>
                                }
                                return <div></div>
                            })
                        });
                        return <div id={num + 64}
                            onClick={() => clickHandler(num + 64)}
                            onKeyDown={keyPress}
                            tabIndex="0"
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