import { createAction } from '@reduxjs/toolkit';
import { IAuthResponse } from 'shared/types/user.interface';


export const getCurrentUser = createAction<IAuthResponse>('user/getCurrentUser');