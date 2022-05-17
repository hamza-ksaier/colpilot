import React, { useState } from 'react';
import produce from 'immer';
// import './App.css';
import { TETROMINOS } from './tetrominos';
const numRows = 20;
const numCols = 20;

const App = () => {



  //Board (Grid)
  const [grid, setGrid] = useState(() => Array.from(Array(numCols), () =>

    new Array(numRows).fill([0, 'clear'])));
  const [s, setS] = useState(0);

  const tetro = TETROMINOS.J.shape;
  // End of conditions 

  let adjecent = true;
  let notFirst = false;

  const clickMe = (x, y) => {
    setS((s) => {
      s++
      return s;
    })
    setGrid(g => {
      return produce(g, gridCopy => {


          for (let i = 1; i < numRows - 1; i++) {
            for (let j = 1; j < numCols - 1; j++) {
              if ((grid[i][j][1] !== grid[i][j + 1][1]) && ((grid[i][j][0] === 11 && grid[i][j + 1][0] === 11)
                || (grid[i][j][0] === 1 && grid[i][j + 1][0] === 1) || (grid[i][j][0] === 1 && grid[i][j + 1][0] === 11) || (grid[i][j][0] === 11 && grid[i - 1][j][0] === 11))
              ) {
               return
              };
            }
          }
        

        // Condition of adjecent
          // loop for tetrominos 
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((tetro[i][j] !== 0)) {
                gridCopy[i + x][j + y][0] = tetro[i][j]
                gridCopy[i + x][j + y][1] = `shape ${s}`
              }

            }
          
       
        }






      })
    })
  }



  //   const ruleGame = (x,y) => {
  //     setGrid(g => {
  //       return produce(g, gridCopy => {
  //         for (let i = 0; i < tetro.length;  i++) {
  //           for (let j = 0; j < tetro[i].length; j++) {
  //         // if(gridCopy[x][y][0] === gridCopy[x][y+1][0]){
  //         //   console.log(gridCopy[x][y][0]  , gridCopy[x][y+1][0])
  //         //   console.log(x, y, x , y+1 )
  //         //   console.log("errur")
  //         // }
  //         // }
  //       }
  //     }
  //       })
  //   })
  // }

  // if(( grid[i][j][1] !== grid[i][j+1][1]) && ((grid[i][j][0] === 11 && grid[i-1][j][0] === 11) )){
  //   console.log("error")
  // }



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
          onClick={() => { clickMe(i, k); }}
          style={{
            width: 30, height: 30,
            backgroundColor: grid[i][k][0] === 0 ? "red" : "blue",
            border: "solid 1px black"
          }}> </div>))}

      </div>
    </>

  );

}
export default App;


