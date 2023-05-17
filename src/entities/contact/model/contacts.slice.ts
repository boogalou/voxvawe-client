import { IContact } from 'shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IContactsState {
  contacts: IContact[];
  searchResult: IContact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IContactsState = {
  contacts: [],
  searchResult: [],
  status: 'idle',
  error: null,
};

const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
  reducers: {
    startLoading(state) {
      state.status = 'loading';
    },

    dataReceived(state, action: PayloadAction<IContact[]>) {
      state.searchResult = action.payload;
    },

    finishLoading(state) {
      state.status = 'succeeded';
    },

    rejected(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    clearSearch(state) {
      state.searchResult = [];
    }
  }
});

export const { startLoading, finishLoading, dataReceived, rejected, clearSearch} = contactsSlice.actions;
export default contactsSlice.reducer;