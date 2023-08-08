import { IUser } from '@/src/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: IUser;
  error: string | null;
  isLoading: boolean;
  isOnline: boolean;
}

const initialState: UserState = {
  user: {} as IUser,
  error: null,
  isLoading: false,
  isOnline: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    dataReceived(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },

    finishLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    toggleOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },

    rejected(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    resetUserState() {
      return initialState;
    },
  },
});

export const {
  startLoading,
  finishLoading,
  dataReceived,
  rejected,
  toggleOnlineStatus,
  resetUserState
} =
  userSlice.actions;
export default userSlice.reducer;
