import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InMessage } from 'shared/types';

export interface MessageState {
  messages: Record<string, InMessage[]>;
  limit: number;
  currentPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
}

const initialState: MessageState = {
  messages: {},
  limit: 25,
  currentPage: 0,
  status: 'idle',
  error: null,
  hasMore: false,
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

    dataReceived(state, { payload } : PayloadAction<{ chat_id: number; messages: InMessage[], hasMore: boolean}>) {
      const chatId = String(payload.chat_id);
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      const minIDInState = state.messages[chatId].map(it => it.id)
      const maxIDinInbox = payload.messages.map(it => it.id);

      if (Math.min(...minIDInState) > Math.max(...maxIDinInbox)) {
        console.log('добавились в начало');
        state.messages[chatId].unshift(...payload.messages)
        state.currentPage += 1;
        state.hasMore = payload.hasMore;
        return;
      }

      state.messages[chatId].push(...payload.messages);
      state.currentPage += 1;
      state.hasMore = payload.hasMore;
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
