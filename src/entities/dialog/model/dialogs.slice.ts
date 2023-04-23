import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {dialogsFetchThunk} from "./dialogsFetch.thunk";
import {IDialog} from "@/entities/dialog/ui/dialog/dialog";

export interface DialogsState {
  dialogs: IDialog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  isActive: boolean;
  selectedDialog: null | number;
  currentDialog: null | IDialog
  isOpen: boolean,
}

const initialState: DialogsState = {
  dialogs: [],
  status: "idle",
  error: null,
  isActive: false,
  selectedDialog: null,
  currentDialog: null,
  isOpen: false,
};

export const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {
    setSelectedDialogAction(state, action: PayloadAction<number | null>) {
      state.selectedDialog = action.payload;
      const currentDialog = state.dialogs.find(dialog => dialog.userId === action.payload);
      state.currentDialog = currentDialog ? {...currentDialog} : null;
    },

    moveFrontMiddleColumn(state, action: PayloadAction<true>) {
      state.isOpen = action.payload
    },

    moveBackMiddleColumn(state, action: PayloadAction<false>) {
      state.isOpen = action.payload
    },

    closeChat(state, action: PayloadAction<null>) {
      state.currentDialog = action.payload;
      state.selectedDialog = action.payload;
    }

  },

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

export const {
  setSelectedDialogAction,
  moveFrontMiddleColumn,
  moveBackMiddleColumn,
  closeChat,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;