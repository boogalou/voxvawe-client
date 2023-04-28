import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUser } from 'shared/types';
import { IAuthResponse } from 'shared/types/user.interface';


export interface AuthState {
  user: IUser;
  error: string | null;
  isLoading: boolean;
  isOnline: boolean;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: {
    id: 0,
    accountId: '',
    username: '',
    email: '',
    accessToken: '',
    refreshToken: '',
    isActivated: false,
  },
  isLoading: false,
  error: null,
  isOnline: false,
  isAuth: false,
}

const authSlice = createSlice({
  name: 'slice/auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    dataReceived(state, action: PayloadAction<IAuthResponse>) {
      console.log(action.payload);
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
  },
})

export const {
  startLoading,
  dataReceived,
  rejected,
  finishLoading,
  setIsAuthenticated
} = authSlice.actions;
export default authSlice.reducer;