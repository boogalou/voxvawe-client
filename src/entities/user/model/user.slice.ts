import { IUser } from '@/src/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from 'shared/types/user.interface';

export interface UserState {
  user: IUser;
  error: string | null;
  isLoading: boolean;
  isOnline: boolean,
  isAuth: boolean,
}

const initialState: UserState = {
  user: {} as IUser,
  error: null,
  isLoading: false,
  isOnline: false,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    dataReceived(state, action: PayloadAction<IAuthResponse>) {
      state.user = action.payload.user;
    },

    finishLoading(state,) {
      state.isLoading = false;
    },

    setIsAuthenticated(state) {
      state.isAuth = !state.isAuth;
    },

    rejected(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  }
})

export const { startLoading, finishLoading, dataReceived, rejected, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;