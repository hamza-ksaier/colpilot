import { createSlice } from "@reduxjs/toolkit";
import TETROMINOS from "../../constants/tetrominos";

const initialState = {
    tetrominos: TETROMINOS,
};

export const tetrominosSlice = createSlice({
    name: "tetrominos",
    initialState,
    reducers: {
        placeShape: (state, action) => {
                const newFiles = state.files;
                newFiles.unshift(...action.payload);
                state.files = newFiles;
        },
    },
});

export const { placeShape } = tetrominosSlice.actions;

export default tetrominosSlice.reducer;
