import { createAction } from '@reduxjs/toolkit';

const addContact = createAction<string>('CONTACTS:ADD_CONTACT');
const deleteContact = createAction<string>('CONTACTS:DELETE_CONTACT');
const getContacts = createAction('CONTACTS:GET_CONTACTS')
const blockContact = createAction<boolean>('CONTACTS:BLOCK_CONTACT');
const searchContacts = createAction<{query: string}>('CONTACTS:SEARCH_REQUEST');


export {
  addContact,
  deleteContact,
  getContacts,
  blockContact,
  searchContacts,
}