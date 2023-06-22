import {
  addContact,
  dataReceived,
  deleteContact,
  finishLoading,
  searchContacts,
  startLoading,
} from 'entities/contact';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { eventChannel, EventChannel } from 'redux-saga';
import { IContact } from 'shared/types';
import axios, { AxiosResponse } from 'axios';
import { contactService } from 'entities/contact/api/contact.service';
import { rejected } from 'entities/auth';
import { getContacts } from 'entities/contact/api/contacts.actions';
import { setSearchResult } from 'entities/contact/model/contacts.slice';

const socket: Socket | undefined =  undefined;

function* searchContactsWorker(action: ReturnType<typeof searchContacts>) {
  if (socket) {
    console.log('searchContactsWorker', action.payload);
    yield call([socket, socket.emit], 'CONTACTS:SEARCH_REQUEST', action.payload);
  }
}

function* getContactsWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IContact[]> = yield call(contactService.getContacts);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message));
    }
  }
}

function* addContactWorker(action: ReturnType<typeof addContact>) {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IContact[]> = yield call(
      contactService.addContactRequest,
      action.payload
    );
    put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(rejected(error.response?.data.message));
    }
  }
}

function* deleteContactWorker(action: ReturnType<typeof deleteContact>) {
  try {
    yield put(startLoading())
    const response: AxiosResponse<IContact[]> = yield call(contactService.deleteContactRequest, action.payload);
    yield put(dataReceived(response.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(rejected(error.response?.data.message));
    }
  }
}

function createSocketChannel(socket: Socket) {
  return eventChannel(emit => {
    const eventHandler = (payload: IContact[]) => {
      console.log('eventHandler: ', payload);
      emit(payload);
    };

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on('CONTACTS:SEARCH_RESPONSE', eventHandler);

    socket.on('error', errorHandler);

    const unsubscribe = () => {
      socket.off('CONTACTS:SEARCH_RESPONSE', eventHandler);
    };

    return unsubscribe;
  });
}

export function* fetchSearch(socket: Socket | undefined) {
if (socket) {
  const socketChannel: EventChannel<Socket> = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const response: IContact[] = yield take(socketChannel);
      yield put(setSearchResult(response));
    } catch (error) {
      console.log(error);
    }
  }
}
  
}

export function* contactsSagaWatcher() {
  yield takeEvery(searchContacts.type, searchContactsWorker);
  yield takeEvery(addContact.type, addContactWorker);
  yield takeEvery(deleteContact.type, deleteContactWorker);
  yield takeEvery(getContacts.type, getContactsWorker);
  yield take('SOCKET_INITIALIZED');
  yield fork(fetchSearch, socket);
}
