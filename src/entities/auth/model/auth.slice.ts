import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from 'shared/types/user.interface';

export interface AuthState {
  accessToken: null | string;
  error: null | string;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: false,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'slice/auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    dataReceived(state, action: PayloadAction<IAuthResponse>) {
      state.accessToken = action.payload.user.access_token;
      state.error = null;
    },

    setIsAuth(state) {
      state.isAuth = true;
    },

    logout(state) {
      state.accessToken = '';
      state.isAuth = false;
      state.error = null;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    rejected(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { startLoading, dataReceived, rejected, finishLoading, setIsAuth, logout } =
  authSlice.actions;
export default authSlice.reducer;