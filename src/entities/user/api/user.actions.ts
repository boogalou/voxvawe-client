import { createAction } from '@reduxjs/toolkit';
import { IProfileData } from "entities/user/user";

export const connectActionsAsync = createAction('SOCKET:CONNECT');
export const getCurrentUserAsync = createAction('USER:GET_CURRENT_USER');
export const updateUserProfileAsync = createAction<{accountId: string, profileData: IProfileData }>('USER:UPDATE_PROFILE');
export const updateUserOnlineStatusAsync = createAction<{ account_id: string, status: boolean}>('USER:UPDATE_USER_ONLINE_STATUS');
export const updateUserImageAsync = createAction<{ id: string, file: FormData }>('USER:UPDATE_AVATAR');
export const getAccessToken = createAction<{ access_token: null | string }>('USER:ACCESS_TOKEN');
export const disconnectSocket = createAction('USER:SOCKET_DISCONNECT');

export const ONLINE = 'USER:STATUS_ONLINE';
export const OFFLINE = 'USER:STATUS_OFFLINE';
export const ERROR_RESPONSE = 'USER:ERROR_RESPONSE';
