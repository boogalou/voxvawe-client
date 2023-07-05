import { createAction } from '@reduxjs/toolkit';

export const connectActionsAsync = createAction('SOCKET:CONNECT');
export const getCurrentUserAsync = createAction('USER:GET_CURRENT_USER');
  export const updateUserOnlineStatusAsync = createAction<{ account_id: string,  status: boolean }>('USER:UPDATE_USER_ONLINE_STATUS');
export const getAccessToken = createAction<{ access_token: null | string }>('USER:ACCESS_TOKEN');
export const disconnectSocket = createAction('USER:SOCKET_DISCONNECT');



export const  ONLINE = 'USER:STATUS_ONLINE'
export const OFFLINE = 'USER:STATUS_OFFLINE'
export const ERROR = 'USER:ERROR'