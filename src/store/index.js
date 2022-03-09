import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./slices/files";

export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});
