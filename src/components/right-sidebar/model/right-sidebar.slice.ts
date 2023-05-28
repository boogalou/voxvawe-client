import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  rightIsOpen: boolean;
}

const initialState: DashboardState = {
  rightIsOpen: false,
};

const rightSidebarSlice = createSlice({
  name: 'leftSidebarSlice',
  initialState,
  reducers: {
    openRightSidebar(state, action: PayloadAction<boolean>) {
      state.rightIsOpen = action.payload;
    },

    closeRightSidebar(state, action: PayloadAction<boolean>) {
      state.rightIsOpen = action.payload;
    }
  },
});

export const {openRightSidebar, closeRightSidebar} = rightSidebarSlice.actions;
export default rightSidebarSlice.reducer;
