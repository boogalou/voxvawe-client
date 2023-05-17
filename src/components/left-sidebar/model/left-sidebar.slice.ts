import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LeftSidebarSliceState {
  isFocus: boolean;
}

const initialState: LeftSidebarSliceState = {
  isFocus: false,
};

export const leftSidebarSlice = createSlice({
  name: 'leftSidebar',
  initialState,
  reducers: {
    setIsBlur(state, action: PayloadAction<boolean>) {
      state.isFocus = action.payload;
    },

    setIsFocus(state, action: PayloadAction<boolean>) {
      state.isFocus = action.payload;
    }
  }
});

export const { setIsBlur, setIsFocus } = leftSidebarSlice.actions;
export default leftSidebarSlice.reducer;