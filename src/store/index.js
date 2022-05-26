import { configureStore } from "@reduxjs/toolkit";
import tetrominosReducer from "./slices/tetrominos";


export const store = configureStore({
    reducer: {
        tetrominos: tetrominosReducer,
    },
});
