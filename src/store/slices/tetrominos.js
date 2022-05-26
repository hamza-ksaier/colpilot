import { createSlice } from "@reduxjs/toolkit";
import TETROMINOS from "../../constants/tetrominos";

const initialState = {
    tetrominos: TETROMINOS,
    id:21
    
};


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
        }
    },
});

export const { placeShape, deleteShape, transpose, flip} = tetrominosSlice.actions;

export default tetrominosSlice.reducer;
