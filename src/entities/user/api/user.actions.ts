import { createAction } from '@reduxjs/toolkit';

export const connectActionsAsync = createAction('SOCKET:CONNECT');
export const getCurrentUserAsync = createAction('USER:GET_CURRENT_USER');
export const updateUserOnlineStatusAsync = createAction<{ accountId: string, username: string, status: string }>('USER:UPDATE_USER_ONLINE_STATUS');
export const getAccessToken = createAction<{ accessToken: null | string }>('USER:ACCESS_TOKEN');