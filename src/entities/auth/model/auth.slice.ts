import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from 'shared/types/user.interface';
import { IErrorResponse } from 'shared/types/auth.interface';

export interface AuthState {
  accessToken: null | string;
  error: null | IErrorResponse;
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

    resetAuthState() {
      return initialState;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    updateToken(state, action: PayloadAction<{ access_token: string }>) {
      state.accessToken = action.payload.access_token
    },

    rejected(state, action: PayloadAction<IErrorResponse | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  startLoading,
  dataReceived,
  rejected,
  finishLoading,
  setIsAuth,
  resetAuthState,
  updateToken,
} =
  authSlice.actions;
export default authSlice.reducer;
