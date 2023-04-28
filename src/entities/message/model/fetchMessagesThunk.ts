import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from 'app/socket.io';
import { IMessage } from 'entities/message/model/message.slice';


const baseUrl = 'https://643e9d42c72fda4a0bfbf51b.mockapi.io/'

export const fetchMessagesThunk = createAsyncThunk<IMessage[], string, { rejectValue: string }>(
    "messages/fetchMessages",
    async (userId) => {
      if (userId === '@342355209') {
        const response = await axios.get(baseUrl + 'msg-one');
        return response.data
      } else if (userId === '@255355921') {
        const response = await axios.get(baseUrl + 'msg-two');
        return response.data
      }

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