import React, { useState } from 'react';
import produce from 'immer';
// import './App.css';
import { TETROMINOS } from './tetrominos';
const numRows = 20;
const numCols = 20;

const App = () => {
  //Board (Grid)
  const [grid, setGrid ] = useState( ()=> Array.from(Array(numCols), () =>
  new Array(numRows).fill([0, 'clear'])   ));


  const tetro = TETROMINOS.I.shape;

  const clickMe = (x,y) => {
    console.log(x,y)
    setGrid(g => {
      return produce(g, gridCopy => {
        console.log(tetro[0].length+y) 
        // loop for tetrominos 
        for (let i = 0; i < tetro.length;  i++) {
          for (let j = 0; j < tetro[i].length; j++) {
            if (tetro[i][j] !== 0) {
              gridCopy[i+x][j+y][1]="dd"
            }
            // for (let l =0; l<tetro.length; l++) {
            //   for (let z=0; z<tetro.length[i]; z++){
            //     if (tetro[l][z] !== 0) {
            //       gridCopy[i][j][1] = "dd";
            //   }
            //   }    
            //   }
            } 
          }
        })
        })
    
  }
  
  return ( 
    <>
    <div className="App"
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${numCols}, 30px)`,
      justifyContent: "center",
      marginTop: "100px"
      }}>


        {/* Dealing with grid  */}
    {grid.map((rows, i) => rows?.map((col, k) => <div
    key={`${i}-${k}`}
    onClick={() => { clickMe(i,k) }}
    style={{
      width: 30, height: 30,
      backgroundColor: grid[i][k][1]=== "clear" ? "red" : "blue",
      border: "solid 1px black"
    }}> </div> ))}

    </div>
    </>
    
   );

}
export default App;


