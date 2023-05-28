import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LeftSidebarSliceState {
  isFocus: boolean;
  isActive: boolean;
}

const initialState: LeftSidebarSliceState = {
  isFocus: false,
  isActive: false,
};

export const leftSidebarSlice = createSlice({
  name: 'leftSidebar',
  initialState,
  reducers: {
    setIsActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },

    setIsFocus(state, action: PayloadAction<boolean>) {
      state.isFocus = action.payload;
    }
  }
});

export const { setIsActive, setIsFocus } = leftSidebarSlice.actions;
export default leftSidebarSlice.reducer;