import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDialog } from 'shared/types';
import { ITyping } from 'shared/types/typing.interface';

export interface IDialogsState {
  dialogs: IDialog[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isTyping: null | ITyping;
  error: null | string;
  selectedDialog: number | null;
  currentDialog: IDialog;
  isActive: boolean;
  isOpen: boolean;
  isClose: boolean;
}

const initialState: IDialogsState = {
  dialogs: [],
  status: 'idle',
  isTyping: null,
  error: null,
  isActive: false,
  selectedDialog: null,
  currentDialog: {} as IDialog,
  isOpen: false,
  isClose: false,
};

const dialogsSlice = createSlice({
  name: 'dialogsSlice',
  initialState,
  reducers: {
    setCurrentDialogAction(state, { payload }: PayloadAction<{ chatId: number }>) {
      if (payload && payload.chatId) {
        state.selectedDialog = payload.chatId;
        const currentDialog = state.dialogs.find(dialog => dialog.id === payload.chatId);
        state.currentDialog = currentDialog ? { ...currentDialog } : ({} as IDialog);
      }
    },

    resetCurrentDialog(state) {
      state.currentDialog = initialState.currentDialog;
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
      state.selectedDialog = null;
    },

    startLoading(state) {
      state.status = 'loading';
    },

    dataReceived(state, { payload }: PayloadAction<IDialog[]>) {
      if (Array.isArray(payload)) {
        state.dialogs = payload;
      }
    },

    updateDialogs(state, { payload }: PayloadAction<IDialog>) {
      state.dialogs = state.dialogs.map(dialog => {
        if (dialog.id === payload.id) {
          dialog = payload;
        }
        return dialog;
      });
    },

    setTyping(state, { payload }: PayloadAction<ITyping>) {
      state.isTyping = payload;
    },

    clearTyping(state, { payload }: PayloadAction<null>) {
      state.isTyping = payload;
    },

    finishLoading(state) {
      state.status = 'succeeded';
    },

    resetDialogsState() {
      return initialState;
    },
  },
});

export const {
  setCurrentDialogAction,
  moveFrontMiddleColumn,
  moveBackMiddleColumn,
  closeChat,
  startLoading,
  finishLoading,
  dataReceived,
  clearTyping,
  resetDialogsState,
  resetCurrentDialog,
  setTyping,
  updateDialogs,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
