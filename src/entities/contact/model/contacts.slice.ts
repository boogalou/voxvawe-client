import { IContact, IDialog } from 'shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IErrorResponse } from "shared/types/auth.interface";

export interface IContactsState {
  contacts: IContact[];
  searchResult: IContact[];
  currentContact: null | IContact;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: IErrorResponse | null;
}

const initialState: IContactsState = {
  contacts: [],
  searchResult: [],
  currentContact: null,
  status: 'idle',
  error: null,
};

const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
  reducers: {
    startLoading(state, { payload }: PayloadAction<'loading'>) {
      state.status = payload;
    },

    dataReceived(state, { payload }: PayloadAction<IContact[]>) {
      state.contacts = payload;
    },

    setSearchResult(state, action: PayloadAction<IContact[]>) {
      state.searchResult = action.payload;
    },

    finishLoading(state, { payload }: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
      state.status = payload;
    },

    setContacts(state, action: PayloadAction<IContact[]>) {
      state.contacts = action.payload;
    },

    rejected(state, { payload }: PayloadAction<IErrorResponse>) {
      state.error = payload;
    },

    updateContactStatus(state, action: PayloadAction<{ accountId: string; status: boolean }>) {
      state.contacts.forEach(contact => {
        if (contact.account_id === action.payload.accountId)
          contact.is_online = action.payload.status;
      });
    },

    clearSearch(state) {
      state.searchResult = [];
    },

    setSelectedContact(state, { payload }: PayloadAction<string>) {
      const result = state.searchResult.find(contact => contact.account_id === payload);
      state.currentContact = result ? result : null;
    },

    setCurrentContact(state, { payload }: PayloadAction<string>) {
      const result = state.contacts.find(contact => contact.account_id === payload);
      state.currentContact = result ? result : null;
    },

    clearCurrentContact(state) {
      state.currentContact = null;
    },

    resetContactsState() {
      return initialState
    }
  },
});

export const {
  startLoading,
  finishLoading,
  dataReceived,
  rejected,
  clearSearch,
  setSelectedContact,
  setSearchResult,
  updateContactStatus,
  setContacts,
  setCurrentContact,
  clearCurrentContact,
  resetContactsState,
} = contactsSlice.actions;
export default contactsSlice.reducer;