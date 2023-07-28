import {
  addContact,
  dataReceived,
  deleteContact,
  finishLoading, rejected,
  searchContacts,
  startLoading
} from "entities/contact";
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { eventChannel, EventChannel } from 'redux-saga';
import { IContact } from 'shared/types';
import axios, { AxiosResponse } from 'axios';
import { contactService } from './contact.service';
import { getContacts } from './contacts.actions';
import { setSearchResult } from '../model/contacts.slice';
import { getAccessToken } from 'entities/user/api/user.actions';
import { connectSocket } from 'shared/services/socket/connect-socket';

function* searchContactsWorker(socket: Socket, action: ReturnType<typeof searchContacts>) {
  if (socket) {
    console.log('searchContactsWorker', action.payload);
    yield call([socket, socket.emit], 'CONTACTS:SEARCH_REQUEST', action.payload);
  }
}

function* getContactsWorker() {
  try {
    yield put(startLoading('loading'));
    const response: AxiosResponse<IContact[]> = yield call(contactService.getContacts);
    yield put(dataReceived(response.data));
    yield put(finishLoading('succeeded'));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message));
      yield put(finishLoading('failed'));
    }
  }
}

function* addContactWorker(action: ReturnType<typeof addContact>) {
  console.log('add contact saga', action.payload);
  try {
    yield put(startLoading('loading'));
    const response: AxiosResponse<IContact[]> = yield call(
      contactService.addContactRequest,
      action.payload
    );
    console.log(response.data);
    yield put(dataReceived(response.data));
    yield put(finishLoading('succeeded'));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data));
      yield put(finishLoading('failed'));
    }
  }
}

function* deleteContactWorker(action: ReturnType<typeof deleteContact>) {
  try {
    yield put(startLoading('loading'));
    const response: AxiosResponse<IContact[]> = yield call(
      contactService.deleteContactRequest,
      action.payload
    );
    yield put(dataReceived(response.data));
    yield put(finishLoading('succeeded'));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(rejected(error.response?.data));
      yield put(finishLoading('failed'));
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

export function* contactsSagaWatcher(): Generator<any, void, any> {
  let token;


  yield takeEvery(addContact.type, addContactWorker);
  yield takeEvery(deleteContact.type, deleteContactWorker);
  yield takeEvery(getContacts.type, getContactsWorker);

  while (true) {
    if (!token) {
      token = yield take(getAccessToken.type);
    }

    const action: ReturnType<typeof searchContacts> = yield take(searchContacts.type)
    const socket = yield call(connectSocket, token);
    yield fork(searchContactsWorker, socket, action);
    yield fork(fetchSearch, socket);
  }
}
