import { createAction } from '@reduxjs/toolkit';
import { IOutMessage } from "shared/types/message.interface";


export const getDialogsAsync = createAction('DIALOG:GET_DIALOGS');
export const connectToRoomAsync = createAction<{chatId: number, userJoinedId: string}>('DIALOG:CONNECT_TO_ROOM');
export const sendMessageAsync = createAction<IOutMessage>('DIALOG:SEND_MESSAGE');
export const typingTextAsync = createAction<{chatId: number }>('DIALOG:SEND_TYPING');