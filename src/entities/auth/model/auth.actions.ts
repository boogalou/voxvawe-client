import { createAction } from "@reduxjs/toolkit";
import { IAuthRequestData } from 'shared/types';



export const loginRequestAsync = createAction<IAuthRequestData>('AUTH:LOGIN');
export const registrationRequestAsync = createAction<IAuthRequestData>('AUTH:REGISTRATION');
export const checkAuthRequestAsync = createAction('AUTH:CHECK_AUTH');

export const logoutRequestAsync = createAction('AUTH:LOGOUT');

