import { createAction } from '@reduxjs/toolkit';


export const searchUserRequest = createAction<string>('search/userSearch');