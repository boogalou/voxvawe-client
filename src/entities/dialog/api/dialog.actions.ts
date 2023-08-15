import { createAction } from '@reduxjs/toolkit';
import { IOutMessage } from "shared/types/message.interface";
import { ICreateGroupData } from "components/left-sidebar/create-group-dialog/create-group-dialog";
import { INewMember } from "components/right-sidebar/details/details";


export const getDialogsAsync = createAction('DIALOG:GET_DIALOGS');
export const connectToRoomAsync = createAction<{chatId: number, accountId: string} | null>('DIALOG:CONNECT_TO_ROOM');
export const sendMessageAsync = createAction<IOutMessage>('DIALOG:SEND_MESSAGE');
export const typingTextAsync = createAction<{chatId: number }>('DIALOG:TYPING');
export const setMessageIsReadAsync = createAction<{chatId: number, messageId: number}>('DIALOG:UPDATE_MESSAGE_STATUS');
export const createGroupDataAsync = createAction<ICreateGroupData>('DIALOG:CREATE_GROUP_REQUEST');
export const addNewMemberToGroupAsync = createAction<INewMember[]>('DIALOG:ADD_MEMBER_REQUEST');