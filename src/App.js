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
  const tetro = TETROMINOS.I.shape;
  // End of conditions 

  const clickMe = (x, y) => {
    setS((s) => {
      s++
      return s;
    })
    setGrid(g => {
      return produce(g, gridCopy => {


      
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
        // Position 1
        if ((s=== 0) && (gridCopy[0][0][0] === 0) ){
            console.log("errooor position 1")
          }
    

      })
      
    })
  }
  // Prohibition touching shapes  with same color 
  for (let i = 0; i < numRows-1  ; i++) {
    for (let j = 0; j < numCols-1 ; j++) {
      if ((grid[i][j][1] !== grid[i][j + 1][1]) 
       && ((grid[i][j][0] === 11 && grid[i][j + 1][0] === 11) 
            || (grid[i][j][0] === 1 && grid[i][j + 1][0] === 1) 
            || (grid[i][j][0] === 1 && grid[i][j + 1][0] === 11) 
            || (grid[i][j][0] === 11 && grid[i + 1][j][0] === 11)          
          )
      ) {
       console.log("error ")
      
      };
    }
  } 
  // prohibition touching column 20
         for (let i=0; i< numRows -1 ; i++)
            if (grid[i][19][0] === 11 && grid[i+1][19][0] === 11){
              console.log("game over")
            }            

        // Game Rule 
        let test=false
        if (s !== 1) {
          for (let i = 1; i < numRows-1  ; i++) {
            for (let j = 1; j < numCols-1 ; j++) {
            if (((grid[i][j][1] !== grid[i][j + 1][1]) && grid[i][j+1] !=="clear" && grid[i][j] !== "clear")
            && ((grid[i][j][0] === 11 && grid[i-1][j-1][0] !== 11)))
                 {
                    console.log("position is wrong")
                    console.log(grid[i][j][0] ,grid[i-1][j+1][0], i ,j )
                    test=true
                    break;
                  }
            }
        if(test) break;
      }
    }
 console.log(grid)

     
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


