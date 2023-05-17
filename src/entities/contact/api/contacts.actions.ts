import { createAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

const addContact = createAction('contacts/addContact');
const removeContact = createAction('contacts/removeContact');
const blockContact = createAction<boolean>('contacts/blockContact');
const searchContacts = createAction<{query: string}>('contacts/searchContacts');


export {
  addContact,
  removeContact,
  blockContact,
  searchContacts,
}