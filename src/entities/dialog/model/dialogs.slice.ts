import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDialog, IUser } from 'shared/types';
import { ITyping } from 'shared/types/typing.interface';

export interface DialogsState {
  dialogs: IDialog[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isTyping: null | ITyping;
  error: null | string;
  isActive: boolean;
  selectedDialog: string;
  currentDialog: IDialog;
  isOpen: boolean;
  isClose: boolean;
}

const initialState: DialogsState = {
  dialogs: [],
  status: 'idle',
  isTyping: null,
  error: null,
  isActive: false,
  selectedDialog: '',
  currentDialog: {} as IDialog,
  isOpen: false,
  isClose: false,
};

const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {
    setSelectedDialogAction(state, action: PayloadAction<string >) {
      state.selectedDialog = action.payload;
      const currentDialog = state.dialogs.find(dialog => dialog.account_id === action.payload);
      state.currentDialog = currentDialog ? { ...currentDialog } : ({} as IDialog);
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

    dataReceived(state, { payload }: PayloadAction<IDialog[] | ITyping>) {
      if (Array.isArray(payload)) {
        state.dialogs = payload;
      }

      if (!Array.isArray(payload)) {
        state.isTyping = payload;
      }
    },

    clearTyping(state, { payload }: PayloadAction<null>) {
      state.isTyping = payload;
    },

    finishLoading(state) {
      state.status = 'succeeded';
    },
  },
});

export const {
  setSelectedDialogAction,
  moveFrontMiddleColumn,
  moveBackMiddleColumn,
  closeChat,
  startLoading,
  finishLoading,
  dataReceived,
  clearTyping,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
