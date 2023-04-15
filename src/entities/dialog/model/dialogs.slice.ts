import {createSlice} from "@reduxjs/toolkit";

import {dialogsFetchThunk} from "./dialogsFetch.thunk";
import {IDialog} from "@/entities/dialog/ui/dialog/dialog";

export interface DialogsState {
  dialogs: IDialog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  isActive: boolean;
}

const initialState: DialogsState = {
  dialogs: [],
  status: "idle",
  error: null,
  isActive: false,
};

export const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
        .addCase(dialogsFetchThunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(dialogsFetchThunk.fulfilled, (state, action) => {
          state.dialogs = action.payload;
          state.status = "succeeded";
        })
        .addCase(dialogsFetchThunk.rejected, (state, action) => {
          state.status = "failed";
        })
  }
});

export const {} = dialogsSlice.actions;

export default dialogsSlice.reducer;