import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDialog } from "@/entities/dialog/ui/dialog/dialog";



export const dialogsFetchThunk = createAsyncThunk<IDialog[], undefined, { rejectValue: string }>(
    'dialogs/fetchDialogs',
    async () => {
      const response = await axios.get('https://60db4f3f801dcb0017291069.mockapi.io/api/v1/contacts');
      return response.data
    }
);