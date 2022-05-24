import { configureStore } from "@reduxjs/toolkit";
import tetrominos from "./slices/tetrominos";

export const store = configureStore({
    reducer: {
        tetrominos: tetrominosReducer,
    },
});
