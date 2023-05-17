import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMessagesThunk, sendMessageThunk } from 'entities/message';
import { IMessage } from 'shared/types';



export interface MessageState {
  messages: IMessage[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  status: 'idle',
  error: null,
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchMessagesThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        state.status = 'failed';
      });

    builder
      .addCase(sendMessageThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        console.log('slice: ', action.payload);
        messageSlice.actions.addMessage(action.payload);
        state.status = 'succeeded';
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;