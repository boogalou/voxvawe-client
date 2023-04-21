import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMessage } from "@/entities/message/model/message.slice";
import {socket} from "@/app/socket.io";

const baseUrl = 'https://643e9d42c72fda4a0bfbf51b.mockapi.io/'

export const fetchMessagesThunk = createAsyncThunk<IMessage[], string, { rejectValue: string }>(
    "messages/fetchMessages",
    async (userId) => {
      const response = await axios.get(baseUrl + userId);
      return response.data
    }
);

export const sendMessageThunk = createAsyncThunk<IMessage, IMessage, { rejectValue: string }>(
    "messages/sendMessage",
    async (message): Promise<IMessage> => {
      const response = await socket.emit("sendMessage", message);
      return message;
    }
);


// socket.on("receiveMessage", (message: IMessage) => {
//   store.dispatch(addMessage(message))
// });