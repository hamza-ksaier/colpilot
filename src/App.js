import React, { useState } from 'react';
import produce from 'immer';
// import './App.css';
import { TETROMINOS } from './tetrominos';
import Shapes from './components/shapes';
const numRows = 20;
const numCols = 20;

const App = () => {
  //Board (Grid)
  const [grid, setGrid] = useState(() => Array.from(Array(numCols), () =>
    new Array(numRows).fill([0, 'clear'])));
  const [s, setS] = useState(0);
  const tetro = TETROMINOS.shape;
  
  const clickMe = (x, y) => {
   
    setGrid(g => {
      return produce(g, gridCopy => {      
        // Condition of adjecent
        
        let shape0 = (s===0);
        // authentication case out the board
        let testBoard = true;
        for (let i = 0; i < tetro.length; i++) {
          for (let j = 0; j < tetro[i].length; j++) {
            if ((i+x > 19 || j+y > 19 )&&(tetro[i][j] !== 0)) {
              testBoard = false;
              break;
            }
          }
      }

              // authentication of all clear cases
              let testClear = true;
              if (testBoard) {
                for (let i = 0; i < tetro.length; i++) {
                  for (let j = 0; j < tetro[i].length; j++) {
                    if( (j+y > 19)&&(tetro[i][j] !== 0)&&(gridCopy[i+x][j+(y-j)][1] !== "clear")) {
                    testClear = false;
                      break;
                    } else if  ((j+y <20)&&(gridCopy[i+x][j+y][1] !== "clear")&&(tetro[i][j] !== 0)) {
                        testClear = false;
                        break;
                    }
                  }
              }
              }
                  //  //  Position 1
                   let testPosition1 = true;
                      if ((shape0)&& ((x !==0 || y!==0) || ( (x ===0 && y ===0) && (tetro[0][0] === 0)))) {
                        testPosition1 = false;
                      }
                      

                      // Condition Corner 
                      let testCorner = true;
                      let testNeighbors = true;
                      if (!shape0){
                      // Condition Top Corner 1
                        let testTopCorner1 = false;
                        for (let i = 0; i < tetro.length; i++) {
                          for (let j = 0; j < tetro[i].length; j++) {
                            if ((tetro[i][j] === 11)&& (
                              (grid[(x+i)-1][(y+j)+1][0]=== 11))){
                              testTopCorner1 = true;
                              break;
                            }
                          }
                          }
                          // Condition Top Corner 2
                          let testTopCorner2 = false;
                         
                          for (let i = 0; i < tetro.length; i++) {
                            for (let j = 0; j < tetro[i].length; j++) {
                              if ((tetro[i][j] === 11)&& ((grid[(x+i)-1][(y+j)-1][0]=== 11))){
                                testTopCorner2 = true;
                                break;
                              }
                            }
                          }

                            //   Condition bottom corner 1
                              let testBottomCorner1 = false;
                
                              for (let i = 0; i < tetro.length; i++) {
                                for (let j = 0; j < tetro[i].length; j++) {
                                  if ((tetro[i][j] === 11)&& ((grid[(x+i)+1][(y+j)-1][0]=== 11))){
                                    testBottomCorner1 = true;
                                    break;
                                }
                                }
                              }

                                  //   Condition bottom corner 2
                                  let testBottomCorner2 = false;
                
                                  for (let i = 0; i < tetro.length; i++) {
                                    for (let j = 0; j < tetro[i].length; j++) {
                                      if ((tetro[i][j] === 11)&& ((grid[(x+i)+1][(y+j)+1][0]=== 11))){
                                        testBottomCorner2 = true;
                                        break;
                                    }
                                    }
                                  }

                             // result of corner conditions 
                           testCorner = testTopCorner1 || testTopCorner2 || testBottomCorner1 || testBottomCorner2


                           // Condition of neighbor'shapes 

                             //   Condition test neighbor 1
                             // left Neighbor 
                             let testNeighbor1 = true;
                              
                
                             for (let i = 0; i < tetro.length; i++) {
                               for (let j = 0; j < tetro[i].length; j++) {
                                 if ((tetro[i][j] !== 0 ) && 
                                 (grid[(x+i)][(y+j)-1][0] !== 0)){
                                   testNeighbor1 = false;
                                   break;
                               }
                               }
                             }
                               //   Condition test neighbor 2
                              //  right neighbor
                               let testNeighbor2 = true;
                
                               for (let i = 0; i < tetro.length; i++) {
                                 for (let j = 0; j < tetro[i].length; j++) {
                                  if ((tetro[i][j] !== 0 ) && 
                                 (grid[(x+i)][(y+j)+1][0] !== 0)){
                                   testNeighbor2 = false;
                                   break;
                               }
                                 }
                               }
                                  //   Condition test neighbor 3
                                  // Top Neighbor
                                  let testNeighbor3 = true;
                
                                  for (let i = 0; i < tetro.length; i++) {
                                    for (let j = 0; j < tetro[i].length; j++) {
                                      if ((tetro[i][j] !== 0 ) && 
                                 (grid[(x+i)-1][(y+j)][0] !== 0)){
                                   testNeighbor3 = false;
                                   break;
                               }
                                    }
                                  }
                                   //   Condition test neighbor 4
                                  // Bottom Neighbor
                                  let testNeighbor4 = true;
                
                                  for (let i = 0; i < tetro.length; i++) {
                                    for (let j = 0; j < tetro[i].length; j++) {
                                      if ((tetro[i][j] !== 0 ) && 
                                 (grid[(x+i)+1][(y+j)][0] !== 0)){
                                   testNeighbor4 = false;
                                   break;
                               }
                                    }
                                  }
                                 
                             // Result of neighbor'conditions
                             
                             testNeighbors =
                              testNeighbor1 && testNeighbor2 && testNeighbor3 && testNeighbor4
                    }
                    
          // build shapesq
          if ( (testBoard)&& (testClear) && (testPosition1)  && (testCorner) && (testNeighbors)) {
            for (let i = 0; i < tetro.length; i++) {
              for (let j = 0; j < tetro[i].length; j++) {
                if ((tetro[i][j] !== 0)) {
                  gridCopy[i + x][j + y][0] = tetro[i][j]
                  gridCopy[i + x][j + y][1] = `shape ${s}`
                  
                }
              }
          }
          setS((s) => {
            s++
            return s;
          })
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
          onClick={() => { clickMe(i, k); }}
          style={{
            width: 30, height: 30,
            backgroundColor: grid[i][k][0] === 0 ? "red" : "blue",
            border: "solid 1px black"
          }}> </div>))}

      </div>
      te
      <Shapes/>
    </>

  );

}
export default App;


