import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from 'shared/types/user.interface';

export interface AuthState {
  accessToken: string;
  error: string | null;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: '',
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
      state.accessToken = action.payload.user.accessToken;
    },

    setAuth(state) {
      state.isAuth = true;
    },

    logout(state) {
      state.accessToken = '';
      state.isAuth = false;
      },

    finishLoading(state) {
      state.isLoading = false;
    },

    rejected(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { startLoading, dataReceived, rejected, finishLoading, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;