import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {IMessage} from "@/entities/message/model/message.slice";

export const messagesThunk = createAsyncThunk<IMessage[], undefined, { rejectValue: string }>(
    "messages/fetchMessages",
    async () => {
      const response = await axios.get('https://60db4f3f801dcb0017291069.mockapi.io/api/v1/contacts');
      return response.data
    }
);

// export const sendMessageThunk = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>(
//     "messages/sendMessage",
//     async (message): Promise<IMessage> => {
//       const response = await socket.emit("sendMessage", message);
//       return message;
//     }
// );
//
//
// socket.on("receiveMessage", (message: IMessage) => {
//   store.dispatch(addMessage(message))
// });