import { combineReducers } from '@reduxjs/toolkit';
import authSlice from 'entities/auth/model/auth.slice';
import dialogSlice from 'entities/dialog/model/dialogs.slice';
import messageSlice from 'entities/message/model/message.slice';
import messageInputSlice from 'components/chat/message-box/model/message-input.slice';
import contactsSlice from 'entities/contact/model/contacts.slice';
import  leftSidebarSlice  from 'components/left-sidebar/model/left-sidebar.slice';
import rightSidebarSlice from 'components/right-sidebar/model/right-sidebar.slice';



export const rootReducer = combineReducers({
  authSlice,
  dialogSlice,
  messageSlice,
  messageInputSlice,
  contactsSlice,
  leftSidebarSlice,
  rightSidebarSlice,
});