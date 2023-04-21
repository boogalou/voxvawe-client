import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IEmoji {
  id: string;
  name: string;
  native: string;
  unified: string;
}


export interface MessageInputStore {
  selectedEmoji: null | IEmoji;
  isPressed: boolean;
  inputFieldIsEmpty: boolean;
}

const initialState: MessageInputStore = {
  selectedEmoji: null,
  isPressed: false,
  inputFieldIsEmpty: true
};

const messageInputSlice = createSlice({
  name: "messageInputSlice",
  initialState,
  reducers: {
    setEmojiHandler(state, action: PayloadAction<IEmoji>) {
      state.selectedEmoji = action.payload;
    },

    checkInputFieldHandler(state, action: PayloadAction<boolean>) {
      state.inputFieldIsEmpty = action.payload;
    }
  }
});

export const { setEmojiHandler, checkInputFieldHandler } = messageInputSlice.actions;
export default messageInputSlice.reducer;