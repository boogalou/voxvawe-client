import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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


});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;