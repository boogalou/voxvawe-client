import { createAction } from '@reduxjs/toolkit';
import { IMessage } from "shared/types";


export const getDialogsAsync = createAction('DIALOG:GET_DIALOGS');
export const connectToRoomAsync = createAction<{chatId: number, userJoinedId: string}>('DIALOG:CONNECT_TO_ROOM');
export const sendMessageAsync = createAction<IMessage>('DIALOG:SEND_MESSAGE');