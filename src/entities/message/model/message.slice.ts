import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InMessage } from 'shared/types';

export interface MessageState {
  messages: Record<string, InMessage[]>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessageState = {
  messages: {},
  status: 'idle',
  error: null,
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    addMessage(state, { payload }: PayloadAction<InMessage>) {
      const chatId = String(payload.chat_id);
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(payload);
    },

    startLoading(state) {
      state.status = 'loading';
    },

    finishLoading(state) {
      state.status = 'succeeded';
    },

    setMessageIsRead(state, { payload }: PayloadAction<{ chatId: number; messageId: number }>) {
      state.messages[payload.chatId].map(message => {
        if (payload.messageId === message.id && !message.is_read) {
          message.is_read = true;
        }
      });
    },

    rejected(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },

    dataReceived(state, { payload }: PayloadAction<{ chat_id: number; messages: InMessage[] }>) {
      const chatId = String(payload.chat_id);
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push(...payload.messages);
    },

    resetMessagesState() {
      return initialState;
    },
  },
});

export const {
  addMessage,
  dataReceived,
  startLoading,
  finishLoading,
  rejected,
  setMessageIsRead,
  resetMessagesState
} =
  messageSlice.actions;
export default messageSlice.reducer;
