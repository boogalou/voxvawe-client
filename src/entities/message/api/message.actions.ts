import { createAction } from "@reduxjs/toolkit";


export const getLatestMessagesAsync = createAction<{ chatId: number, page: number, limit?: number }>('MESSAGE:GET_LATEST_MESSAGES');



