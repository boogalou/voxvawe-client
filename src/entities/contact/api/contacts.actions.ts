import { createAction } from '@reduxjs/toolkit';

const addContactAsync = createAction<string>('CONTACTS:ADD_CONTACT');
const deleteContactAsync = createAction<string>('CONTACTS:DELETE_CONTACT');
const getContactsAsync = createAction('CONTACTS:GET_CONTACTS')
const blockContactAsync = createAction<boolean>('CONTACTS:BLOCK_CONTACT');
const searchContactsAsync = createAction<{query: string}>('CONTACTS:SEARCH_REQUEST');


export {
  addContactAsync,
  deleteContactAsync,
  getContactsAsync,
  blockContactAsync,
  searchContactsAsync,
}