import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {messagesThunk} from "./messages.thunk";


export interface IMessage {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
  isRead: boolean;
  isGroup: boolean;
  attachments: [];
}


export interface MessageState {
  messages: IMessage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MessageState = {
  messages: [
    {
      id: 1,
      userId: 100,
      text: "Hello Everyone",
      attachments: [],
      isGroup: false,
      isRead: false,
      timestamp: Date.now().toString()
    },
    {
      id: 2,
      userId: 200,
      text: "Good morning!",
      attachments: [],
      isGroup: true,
      isRead: true,
      timestamp: Date.now().toString()
    },
    {
      id: 3,
      userId: 200,
      text: "What's up?",
      attachments: [],
      isGroup: true,
      isRead: false,
      timestamp: Date.now().toString()
    },
    {
      id: 4,
      userId: 100,
      text: "I am fine, thanks.",
      attachments: [],
      isGroup: false,
      isRead: true,
      timestamp: Date.now().toString()
    },
    {
      id: 5,
      userId: 100,
      text: "How are you?",
      attachments: [],
      isGroup: false,
      isRead: false,
      timestamp: Date.now().toString()
    },
    {
      id: 6,
      userId: 200,
      text: "I am doing great, thanks for asking!",
      attachments: [],
      isGroup: true,
      isRead: true,
      timestamp: Date.now().toString()
    },
    {
      id: 7,
      userId: 100,
      text: "Let's meet tomorrow at 10 AM",
      attachments: [],
      isGroup: false,
      isRead: true,
      timestamp: Date.now().toString()
    },
    {
      id: 8,
      userId: 200,
      text: "Sorry, I can't make it tomorrow. How about 2 PM?",
      attachments: [],
      isGroup: false,
      isRead: true,
      timestamp: Date.now().toString()
    },
    {
      id: 9,
      userId: 100,
      text: "Sounds good to me. See you then!",
      attachments: [],
      isGroup: false,
      isRead: false,
      timestamp: Date.now().toString()
    },
    {
      id: 10,
      userId: 200,
      text: "Hey, have you seen the latest episode of Game of Thrones?",
      attachments: [],
      isGroup: true,
      isRead: false,
      timestamp: Date.now().toString()
    },
    {
      id: 11,
      userId: 100,
      text: "No, I haven't had the time to watch it yet. Please don't spoil it for me!",
      attachments: [],
      isGroup: true,
      isRead: false,
      timestamp: Date.now().toString()
    },
    {
      id: 200,
      userId: 200,
      text: "Don't worry, I won't spoil it for you. It's amazing, though!",
      attachments: [],
      isGroup: true,
      isRead: false,
      timestamp: Date.now().toString()
    }
  ],
  status: "idle",
  error: null,
}

const messageSlice = createSlice({
      name: "messageSlice",
      initialState,
      reducers: {
        addMessage(state, action: PayloadAction<IMessage>) {
          state.messages.push(action.payload)
        },
      },

      extraReducers: (builder) => {
        builder.addCase(messagesThunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
            .addCase(messagesThunk.fulfilled, (state, action) => {
              state.messages = action.payload;
              state.status = "succeeded";
            })
            .addCase(messagesThunk.rejected, (state, action) => {
              state.status = "failed";
            })

        // builder.addCase(sendMessageThunk.pending, (state) => {
        //   state.status = "loading";
        //   state.error = null;
        // })
        //     .addCase(sendMessageThunk.fulfilled, (state, action) => {
        //       console.log("slice: ", action.payload)
        //       messageSlice.actions.addMessage(action.payload);
        //       state.status = "succeeded";
        //     })
        //     .addCase(sendMessageThunk.rejected, (state, action) => {
        //       state.status = "failed";
        //     })
      }
    }
);

export const {addMessage} = messageSlice.actions;
export default messageSlice.reducer