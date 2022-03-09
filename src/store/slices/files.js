import { createSlice } from "@reduxjs/toolkit";
import FILES from "../../constants/files";

const initialState = {
  files: FILES,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    test: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { test } = filesSlice.actions;

export default filesSlice.reducer;
