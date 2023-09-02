import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LeftSidebarSliceState {
  isFocus: boolean;
  isActive: boolean;
  settingsIsActive: boolean;
  isEditProfile: boolean;
}

const initialState: LeftSidebarSliceState = {
  isFocus: false,
  isActive: false,
  settingsIsActive: false,
  isEditProfile: false,
};

export const leftSidebarSlice = createSlice({
  name: 'leftSidebar',
  initialState,
  reducers: {
    setIsActive(state, { payload }: PayloadAction<boolean>) {
      state.isActive = payload;
    },

    setIsFocus(state, { payload }: PayloadAction<boolean>) {
      state.isFocus = payload;
    },

    setSettingsIsActive(state, { payload }: PayloadAction<boolean>) {
      state.settingsIsActive = payload;
    },

    setIsEditProfileActive(state, { payload }: PayloadAction<boolean>) {
      state.isEditProfile = payload;
    }
  },
});

export const {
  setIsActive,
  setIsFocus,
  setSettingsIsActive,
  setIsEditProfileActive,
} = leftSidebarSlice.actions;
export default leftSidebarSlice.reducer;
