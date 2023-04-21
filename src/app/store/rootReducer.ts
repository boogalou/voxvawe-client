import { combineReducers } from "@reduxjs/toolkit";
import  dialogSlice  from '@/entities/dialog/model/dialogs.slice';
import messageSlice from "@/entities/message/model/message.slice";
import messageInputSlice from "@/widgets/message-box/model/message-input.slice";




export const rootReducer = combineReducers({
  // authSlice,
  dialogSlice,
  messageSlice,
  messageInputSlice,
});