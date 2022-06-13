import { createSlice } from "@reduxjs/toolkit";
import TETROMINOS from "../../constants/tetrominos";

const initialState = {
    tetrominos: TETROMINOS,
    id:21,
    currentplayer:2,
     blueTurn : false,
     yellowTurn : false,
     redTurn : false,
     greenTurn : false,
    score : 0,
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
};

let a = 0;
let b = 0;
let c = 0;
let d = 5;

export const tetrominosSlice = createSlice({
    name: "tetrominos",
    initialState,
    reducers: {
        placeShape: (state, action) => {
            state.id=action.payload.id
        },
        deleteShape: (state) => {
           state.tetrominos.filter(tetro => tetro.id === state.id).map(tet => tet.isPlaced = true)
        },
        
        transpose : (state) => {
            let searchShapeById = state.tetrominos.find(tetro => tetro.id === state.id);
            let matrix = searchShapeById.shape;
            if (matrix) {
                for (let i = 0; i < Math.floor(matrix.length / 2); i++) {
                    for (let j = i; j < matrix.length - i - 1; j++) {
                        //Store the right value and start the rotation from here
                        let temp = matrix[i][j];
                        matrix[i][j] = matrix[j][matrix.length - 1 - i];
                        matrix[j][matrix.length - 1 - i] =
                            matrix[matrix.length - 1 - i][matrix.length - 1 - j];
                        matrix[matrix.length - 1 - i][matrix.length - 1 - j] =
                            matrix[matrix.length - 1 - j][i];
                        // Assign temp to left
                        matrix[matrix.length - 1 - j][i] = temp;
                    }
                }
            }
            state.tetrominos.find((t)=>t.id===state.id).shape=matrix
        },
        
        flip :(state) =>  {
            let searchShapeById = state.tetrominos.find(tetro => tetro.id === state.id);
            let matrix = searchShapeById.shape;
           // flip the matrix
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < Math.floor(matrix[i].length / 2); j++) {
                    [matrix[i][j], matrix[i][matrix[i].length - j - 1]] = [
                        matrix[i][matrix[i].length - j - 1],
                        matrix[i][j],
                    ];
                }
            }
            state.tetrominos.find((t) => t.id === state.id).shape = matrix
        },
        playTurn : (state)=> {
            state.currentplayer = state.currentplayer+ 1
        },
        myTern : (state) => {
        if ((state.currentplayer === 2) || (state.currentplayer - d === 1)) {
            a = state.currentplayer;
            state.greenTurn = false;
            state.blueTurn = true
        } else if ((state.currentplayer === 3) || (state.currentplayer - a === 1)) {
            state.blueTurn = false;
            b = state.currentplayer;
            state.yellowTurn = true
        } else if ((state.currentplayer === 4) || (state.currentplayer - b === 1)) {
            state.yellowTurn = false;
            c = state.currentplayer;
            state.redTurn = true
        } else if ((state.currentplayer === 5) || (state.currentplayer - c === 1)) {
            state.redTurn = false;
            d = state.currentplayer;
            state.greenTurn = true
        }
    },
        myScore : (state) => {
            let searchShapeById = state.tetrominos.find(tetro => tetro.id === state.id);
            let matrix = searchShapeById.shape;

                for (let i = 0; i < matrix.length; i++) {
                    for (let j = 0; j < matrix[i].length; j++) {
                        if (state.blueTurn === true && matrix[i][j] !== 0){
                            state.score1++
                        } else if (state.yellowTurn === true && matrix[i][j] !== 0) {
                            state.score2++
                        } else if (state.redTurn === true && matrix[i][j] !== 0) {
                            state.score3++
                        } else if(state.greenTurn === true && matrix[i][j] !== 0) {
                        state.score4++
                        }
                    }
                }
            }
        
    },
});

export const { placeShape, deleteShape, transpose, flip, playTurn , myTern , myScore} = tetrominosSlice.actions;

export default tetrominosSlice.reducer;
