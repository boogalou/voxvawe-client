import { createAction } from '@reduxjs/toolkit';

const addContact = createAction<string>('contacts/addContact');
const removeContact = createAction('contacts/removeContact');
const getContacts = createAction('contacts/getContacts')
const blockContact = createAction<boolean>('contacts/blockContact');
const searchContacts = createAction<{query: string}>('contacts/searchContacts');


export {
  addContact,
  removeContact,
  getContacts,
  blockContact,
  searchContacts,
}