import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDialog, IUser } from 'shared/types';

export interface DialogsState {
  dialogs: IDialog[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
  isActive: boolean;
  selectedDialog: string;
  currentDialog: null | IDialog;
  isOpen: boolean;
  isClose: boolean;
}

const initialState: DialogsState = {
  dialogs: [],
  status: 'idle',
  error: null,
  isActive: false,
  selectedDialog: '',
  currentDialog: null,
  isOpen: false,
  isClose: false,
};

const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {
    setSelectedDialogAction(state, action: PayloadAction<string>) {
      state.selectedDialog = action.payload;
      const currentDialog = state.dialogs.find(dialog => dialog.interlocutorId === action.payload);
      state.currentDialog = currentDialog ? { ...currentDialog } : null;
    },

    moveFrontMiddleColumn(state, action: PayloadAction<true>) {
      state.isOpen = action.payload;
      if (state.isClose) {
        state.isClose = false;
      }
    },

    moveBackMiddleColumn(state, action: PayloadAction<false>) {
      state.isOpen = action.payload;
    },

    closeChat(state, action: PayloadAction<boolean>) {
      state.isClose = action.payload;
      state.selectedDialog = '';
    },

    startLoading(state) {
      state.status = 'loading';
    },

    dataReceived(state, action: PayloadAction<IDialog[]>) {
      state.dialogs = action.payload;
    },

    finishLoading(state) {
      state.status = 'succeeded'
    }
  },


});

export const { setSelectedDialogAction, moveFrontMiddleColumn, moveBackMiddleColumn, closeChat, startLoading, finishLoading, dataReceived } =
  dialogsSlice.actions;

export default dialogsSlice.reducer;