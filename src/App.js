import React, { useState } from 'react';
import produce, { current } from 'immer';
// import './App.css';
import Shapes from './components/shapes';
import { useSelector, useDispatch } from 'react-redux';
import { deleteShape } from './store/slices/tetrominos';
import { cleanMatrix } from './utils/cleanMatrix';
import Cols from './utils/numberCols'
import Rows from './utils/numberRows';
const numRows = 20;
const numCols = 20;
let a = 0;
let b = 1;
let c = 2;
let d = 3;

const App = () => {
  //Board (Grid)
  const [grid, setGrid] = useState(() => Array.from(Array(numCols), () =>
    new Array(numRows).fill([0, 'clear'])));
  const [s, setS] = useState(0);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.tetrominos);
  const { tetrominos } = useSelector((state) => state.tetrominos);


  const tetro = cleanMatrix(tetrominos[id].shape);
  console.log(tetro)
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
  let currentUser = false;
console.log(grid
)
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
   
          let testPosition0 =false;
        const Position = () => {
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((s===0  && x===0 && y===0 && id < 21 && tetro[0][0]===11)
              ) {
              return testPosition0 = true;
              }
              else if ((s === 1) &&   (id >21 && id < 44) && (x === 0) && (tetro[0][Cols(tetro)-1]===22 && y+Cols(tetro)-1 ===19)   ) {
                return testPosition0 = true;
              } else if ((s === 2) && (id > 43 && id < 64) && (y === 0) && (tetro[Rows(tetro) - 1][0] === 33 && x + Rows(tetro) - 1 === 19)) {
                return testPosition0 = true;
              }
              else if ((s === 3) && (id > 63) && (tetro[Rows(tetro) - 1][Cols(tetro)-1] === 44 && x + Rows(tetro) - 1 === 19 && y + Cols(tetro) - 1 === 19)) {
                return testPosition0 = true;
              }
            }}
          return testPosition0;
          }
          Position();
        
     
        // Condition Corner 
        let testCorner = true;
        let testNeighbors = true;
        console.log(a , b ,c ,d , s)

            if (s<4) {
              currentUser = true;
            }
        console.log(currentUser)

        if (s>3) {
          testPosition0 = true

     
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
        if ((testBoard) &&(testClear)   && (testCorner) && (testNeighbors) && (id !== 21) && (testPosition0) ) {
          const checkUser = () => {
            if ((s - a === 4) && (id < 21)) {
              currentUser = true;
              a = s;
            } else if ((s - b === 4) && (id > 21 && id < 44)) {
              currentUser = true;
              b = s;
            } else if ((s - c === 4) && (id > 43 && id < 64)) {
              currentUser = true;
              c = s;
            } else if ((s - d === 4) && (id > 63)) {
              d= s;
              currentUser = true;
            }
            return currentUser;
          }
          checkUser(); 
          if (currentUser) {
            for (let i = 0; i < tetro.length; i++) {
              for (let j = 0; j < tetro[i].length; j++) {
                if ((tetro[i][j] !== 0)) {
                  gridCopy[i + x][j + y][0] = tetro[i][j]
                  gridCopy[i + x][j + y][1] = `shape ${s}`

                }
              }
            }
            setS(s + 1);
            document.getElementById(id).classList.add('hidden')
            dispatch(deleteShape())
          }
         

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


