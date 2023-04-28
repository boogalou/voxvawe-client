import { createAction } from "@reduxjs/toolkit";
import { IAuthRequestData } from 'shared/types';



export const loginRequest = createAction<IAuthRequestData>('auth/login');
export const registrationRequest = createAction<IAuthRequestData>('auth/registration');
export const checkAuthRequest = createAction('auth/checkAuth');
export const logoutRequest = createAction('auth/logout');

