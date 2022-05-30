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

  let jokerCenter =11;
  let jokerCorner=11;
  let shape0;
  if (id < 22) {
    jokerCorner = 11;
    jokerCenter = 1;
    shape0 = (s === 0);
  } else if (id > 22 && id < 43) {
    jokerCorner = 22;
    jokerCenter = 2;
    // shape0 = (s === 1);
  } else if (id > 42 && id < 64) {
    jokerCorner = 33;
    jokerCenter = 3;
    // shape0 = (s === 3);
  } else if (id > 64) {
    jokerCorner = 44;
    jokerCenter = 4;
    // shape0 = (s === 4);
  }



  const clickMe = (x, y) => {
    console.log(jokerCorner);
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
              if ((i + x) && (j + (y - j)) && (tetro[i][j] !== 0) && (gridCopy[i + x][j + (y - j)][1] !== "clear")) {
                testClear = false;
                break;
              } else if ((gridCopy[i+x][j+y])&& (gridCopy[i + x][j + y][1] !== "clear") && (tetro[i][j] !== 0)) {
                testClear = false;
                break;
              }
            }
          }
        }
        let testPosition1 = true;
        let testPosition2 = true;
        let testPosition3 = true; 
        const Position = () => {
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((shape0) && ((x !== 0 || y !== 0) || ((x === 0 && y === 0) && (tetro[0][0] === 0)))) {
                testPosition1 = false;
              }
              if ((s === 2) && ((tetro[0][j] !== 0) && (x = 0) && (j + y !== 19))) {
                testPosition2 = false;
                break;
              }
              if ((s === 3) && ((tetro[i][0] !== 0) && (j = 0) && (x + i !== 19))) {
                testPosition3 = false;
                break;
              }
            }
          }
        }
        Position();

        // Condition Corner 
        let testCorner = true;
        let testNeighbors = true;
        if (s>2) {
          // Condition Top Corner 1
          let testTopCorner1 = false;
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if (((tetro[i][j] === jokerCorner))
               && (
                ((grid[(x + i) - 1][(y + j) + 1]) && ( grid[(x + i) - 1][(y + j) + 1][0] === jokerCorner)))) {
                testTopCorner1 = true;
                break;
              }
            }
          }
          // Condition Top Corner 2
          let testTopCorner2 = false;
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((tetro[i][j] === jokerCorner) && ((grid[(x + i) - 1][(y + j) - 1]) && (grid[(x + i) - 1][(y + j) - 1][0] === jokerCorner))) {
                testTopCorner2 = true;
                break;
              }
            }
          }
          //   Condition bottom corner 1
          let testBottomCorner1 = false;
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((tetro[i][j] === jokerCorner) && ((grid[(x + i) + 1][(y + j) - 1]) && (grid[(x + i) + 1][(y + j) - 1][0] === jokerCorner))) {
                testBottomCorner1 = true;
                break;
              }
            }
          }
          //   Condition bottom corner 2
          let testBottomCorner2 = false;
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((tetro[i][j] === jokerCorner) && ((grid[(x + i) + 1][(y + j) + 1]) && (grid[(x + i) + 1][(y + j) + 1][0] === jokerCorner))) {
                testBottomCorner2 = true;
                break;
              }
            }
          }
          // result of corner conditions 
          testCorner = testTopCorner1 || testTopCorner2 || testBottomCorner1 || testBottomCorner2


          // Condition of neighbor'shapes 

          //   Condition test neighbor 1
          //   left Neighbor 
          let testNeighbor1 = true;
          for (let i = 0; i < tetro.length; i++) {
            for (let j = 0; j < tetro[i].length; j++) {
              if ((String(tetro[i][j]).includes(jokerCenter)) &&
                ((grid[(x + i)][(y + j) - 1]) && (String(grid[(x + i)][(y + j) - 1][0]).includes(jokerCenter)))) {
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
              if ((String(tetro[i][j]).includes(jokerCenter)) &&
                ((grid[(x + i)][(y + j) + 1]) && (String(grid[(x + i)][(y + j) + 1][0]).includes(jokerCenter)))) {
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
              if ((String(tetro[i][j]).includes(jokerCenter)) &&
                ((grid[(x + i) - 1][(y + j)]) && String(grid[(x + i) - 1][(y + j)][0]).includes(jokerCenter))) {
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
              if ((String(tetro[i][j]).includes(jokerCenter)) &&
                ((grid[(x + i) + 1][(y + j)]) && String(grid[(x + i) + 1][(y + j)][0]).includes(jokerCenter))) {
                testNeighbor4 = false;
                break;
              }
            }
          }

          // Result of neighbor'conditions

          testNeighbors =
            testNeighbor1 && testNeighbor2 && testNeighbor3 && testNeighbor4
        }

        // build shapes
        if ((testBoard) && (testClear) && (testPosition1) && (testPosition2) && (testPosition3) && (testCorner) && (testNeighbors)) {
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


