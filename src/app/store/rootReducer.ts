import { combineReducers } from "@reduxjs/toolkit";
import  dialogSlice  from '@/entities/dialog/model/dialogs.slice';
import messageSlice from "@/entities/message/model/message.slice";
// import messageInputSlice from "../../features/message-input/model/message-input.slice";
// import messageSlice from "../../features/message/model/message.slice";
// import authSlice from "../../features/auth/model/auth.slice";



export const rootReducer = combineReducers({
  // authSlice,
  dialogSlice,
  messageSlice,
  // messageInputSlice,
});