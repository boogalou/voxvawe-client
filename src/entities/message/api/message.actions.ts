import { createAction } from "@reduxjs/toolkit";


export const getLatestMessagesAsync = createAction<number>('MESSAGE:GET_LATEST_MESSAGES');
export const setMessageIsReadAsync = createAction<{chatId: number, messageId: number}>('MESSAGE:SET_MESSAGE_IS_READ');

export const SET_MESSAGE_STATUS = 'MESSAGE:SET_MESSAGE_STATUS';
export const GET_MESSAGE_STATUS = 'MESSAGE:GET_MESSAGE_STATUS';
export const ERROR_RESPONSE = 'MESSAGE:ERROR_RESPONSE';