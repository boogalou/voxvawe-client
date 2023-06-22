import { IContact, IDialog } from 'shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IContactsState {
  contacts: IContact[];
  searchResult: IContact[];
  currentContact: null | IContact;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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
    startLoading(state) {
      state.status = 'loading';
    },

    dataReceived(state, action: PayloadAction<IContact[]>) {
      state.contacts = action.payload;
    },

    setSearchResult(state, action: PayloadAction<IContact[]>) {
      state.searchResult = action.payload;
    },

    finishLoading(state) {
      state.status = 'succeeded';
    },

    setContacts(state, action: PayloadAction<IContact[]>) {
      state.contacts = action.payload;
    },

    rejected(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    updateContactStatus(state, action: PayloadAction<{ accountId: string, username: string, status: string }>) {
      state.contacts.forEach((contact) => {
        if (contact.accountId === action.payload.accountId) {
          if (action.payload.status === 'online') {
            contact.isOnline = true;
          }
          if (action.payload.status === 'offline') {
            contact.isOnline = false;
          }
        }
      })
    },

    clearSearch(state) {
      state.searchResult = [];
    },
    
    setSelectedContact(state, action: PayloadAction<string>) {
      const result = state.searchResult.find(contact => contact.accountId === action.payload);
      state.currentContact = result ? result : null;
    }
  }
});

export const { startLoading, finishLoading, dataReceived, rejected, clearSearch, setSelectedContact, setSearchResult, updateContactStatus, setContacts} = contactsSlice.actions;
export default contactsSlice.reducer;