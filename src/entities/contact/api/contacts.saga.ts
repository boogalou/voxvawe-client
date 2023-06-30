import {
  addContact,
  dataReceived,
  deleteContact,
  finishLoading,
  searchContacts,
  startLoading,
} from 'entities/contact';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import io, { Socket } from 'socket.io-client';
import { eventChannel, EventChannel } from 'redux-saga';
import { IContact } from 'shared/types';
import axios, { AxiosResponse } from 'axios';
import { contactService } from './contact.service';
import { rejected } from 'entities/auth';
import { getContacts } from './contacts.actions';
import { setSearchResult } from '../model/contacts.slice';
import { getAccessToken } from 'entities/user/api/user.actions';
import { socketConfig } from 'shared/services';
import { API_URL } from 'shared/constants';

function connectToSocket(action: ReturnType<typeof getAccessToken>): Promise<Socket> {
  return new Promise((resolve, reject) => {
    socketConfig.auth.authorization = 'Bearer ' + action.payload.accessToken;

    const newSocket = io(API_URL, socketConfig);
    newSocket.on('connect', () => {
      console.log('Connect to server success');
      resolve(newSocket);
    });

    newSocket.on('connect_error', error => {
      console.log(error);
      reject(error);
    });

    newSocket.connect();
  });
}

function* searchContactsWorker(socket: Socket, action: ReturnType<typeof searchContacts>) {
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
  console.log('addContactWorker: ', action.payload);
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
    yield put(startLoading());
    const response: AxiosResponse<IContact[]> = yield call(
      contactService.deleteContactRequest,
      action.payload
    );
    yield put(dataReceived(response.data));
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
    const socket = yield call(connectToSocket, token);
    yield fork(searchContactsWorker, socket, action);
    yield fork(fetchSearch, socket);
  }
}
