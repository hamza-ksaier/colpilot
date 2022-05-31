import React, { useState } from 'react';
import produce from 'immer';
// import './App.css';
import Shapes from './components/shapes';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShape } from './store/slices/tetrominos';
const numRows = 20;
const numCols = 20;

const App = () => {
  //Board (Grid)
  const [grid, setGrid] = useState(() => Array.from(Array(numCols), () =>
    new Array(numRows).fill([0, 'clear'])));
  const [s, setS] = useState(0);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.tetrominos);
  const { tetrominos } = useSelector((state) => state.tetrominos);


  const tetro = tetrominos[id].shape;

  let jokerCenter = 11;
  let jokerCorner = 11;

  if (id < 21) {
    jokerCorner = 11;
    jokerCenter = 1;
  } else if (id > 22 && id < 43) {
    jokerCorner = 22;
    jokerCenter = 2;
  } else if (id > 42 && id < 64) {
    jokerCorner = 33;
    jokerCenter = 3;
  } else if (id > 64) {
    jokerCorner = 44;
    jokerCenter = 4;
  }


  const clickMe = (x, y) => {
    setGrid(g => {
      return produce(g, gridCopy => {
        // Condition of adjecent
        // authentication case out the board
        let testBoard = true;
        for (let i = 0; i < tetro.length; i++) {
          for (let j = 0; j < tetro[i].length; j++) {
            if ((i + x > 19 || j + y > 19) && (tetro[i][j] !== 0)) {
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
              if ((tetro[i][j] !== 0) &&
                ((gridCopy[i + x]) &&
                  (gridCopy[i + x][j + (y - j)][1] !== "clear"))) {
                if (gridCopy[i + x][j + (y - j)]) {
                  testClear = false;
                  break;
                }
              } else if (
                (gridCopy[i + x]) &&
                (tetro[i][j] !== 0)
              ) {
                if (gridCopy[i + x][j + y] && (gridCopy[i + x][j + y][1] !== "clear")) {
                  testClear = false;
                  break;
                }
              }
            }
          }
        }
   
          let testPosition0 =true;
          console.log(s);
        const Position = () => {
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((s===0)&&((x!==0 || y!==0) || (x===0 && y===0 && tetro[0][0]===0))
              ) {
              return testPosition0 = false;
              }
              // else if ((s === 2) || ((id < 21 && id > 44) && ((x !== 0) || (tetro[0][j] !== 0) && y + j !== 19))) {
              //   return testPosition0 = false;
              // }        
            }}
          return testPosition0;
          }
          Position();
        console.log(testPosition0);

        // Condition Corner 
        let testCorner = true;
        let testNeighbors = true;
        if (s > 3) {
          // function of corner shapes
          const corner = (X, Y) => {
            for (let i = 0; i < tetro.length; i++) {
              for (let j = 0; j < tetro[i].length; j++) {
                if ((tetro[i][j] === jokerCorner)
                  && grid[X + i]) {
                  if (grid[X + i][Y + j]) {
                    if (grid[X + i][Y + j][0] === jokerCorner) {
                      return true
                    }
                  }
                }
              }
            }
          }
          // result of corner conditions 
          testCorner = corner(x - 1, y + 1) || corner(x - 1, y - 1) || corner(x + 1, y - 1) || corner(x + 1, y + 1);



          // function of neighbor shapes 
          const neighbor = (X, Y) => {
            for (let i = 0; i < tetro.length; i++) {
              for (let j = 0; j < tetro[i].length; j++) {
                if ((String(tetro[i][j]).includes(jokerCenter)) &&
                  grid[X + i]) {
                  if (grid[X + i][Y + j]) {
                    if (String(grid[X + i][Y + j][0]).includes(jokerCenter)) {
                      return false;
                    }
                  }
                }
              }
            }
          }

          // Result of neighbor'conditions
          if (neighbor(x, y - 1)=== false || neighbor(x, y + 1) === false  || neighbor(x - 1, y) === false ||  neighbor(x + 1, y) === false ){
            testNeighbors = false
          };

        }

        // build shapes
        if ((testBoard) && (testClear)   && (testCorner) && (testNeighbors) && (id !== 21) && (testPosition0) ) {
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
          document.getElementById(id).classList.add('hidden')
          dispatch(deleteShape())

        }
      })

    })
  }
  let backgroundColor;
  const background = (i, k) => {
    if (String(grid[i][k][0]).includes(1)) {
      return backgroundColor = "cyan"
    } else if (String(grid[i][k][0]).includes(2)) {
      return backgroundColor = "yellow"
    } else if (String(grid[i][k][0]).includes(3)) {
      return backgroundColor = "red"
    } else if (String(grid[i][k][0]).includes(4)) {
      return backgroundColor = "green"
    } else {
      return backgroundColor = "grey";
    }

  }
  return (
    <>
      <div className='App'>
        <div className="Board"
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
              backgroundColor: background(i, k),
              border: "solid 1px black"
            }}> </div>))}

        </div>

        <Shapes />
      </div>

    </>

  );

}
export default App;


