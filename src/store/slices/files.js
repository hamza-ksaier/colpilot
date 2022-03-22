import { createSlice } from "@reduxjs/toolkit";
import FILES from "../../constants/files";
import { nanoid } from "nanoid";

const initialState = {
  files: FILES,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (state, action) => {
      const newFiles = state.files;
      newFiles.unshift(...action.payload);
      state.files = newFiles;
      },
    deleteStarredFile: (state, action) => {
      const File = state.files.find(file => file.id === action.payload)
      
      File.isStarred = false;
        return state;
    },
    
      deleteArchivedFile: (state, action) => {
        const File = state.files.find(file => file.id === action.payload)
        
        File.isArchived = false;
          return state;
      },
      starredFile: (state, action) => {
        const File = state.files.find(file => file.id === action.payload)
        File.isStarred = true;
      },
      archivedFile: (state, action) => {
        const File = state.files.find(file => file.id === action.payload)
        File.isArchived = true;
      }
  },
});

export const { deleteStarredFile, deleteArchivedFile, starredFile, archivedFile, addFile } = filesSlice.actions;

export default filesSlice.reducer;
