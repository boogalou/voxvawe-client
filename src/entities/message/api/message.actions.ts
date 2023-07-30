import { createAction } from "@reduxjs/toolkit";


export const getLatestMessagesAsync = createAction<number>('MESSAGE:GET_LATEST_MESSAGES');
export const setMessageIsReadAsync = createAction<{chatId: number, messageId: number}>('MESSAGE:SET_MESSAGE_IS_READ');

export const SET_MESSAGE_IS_READ = 'MESSAGE:SET_MESSAGE_IS_READ';
export const GET_MESSAGE_IS_READ = 'MESSAGE:GET_MESSAGE_IS_READ';
export const ERROR_RESPONSE = 'MESSAGE:ERROR_RESPONSE';