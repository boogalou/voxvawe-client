import {
  addContact,
  dataReceived,
  finishLoading,
  searchContacts,
  startLoading,
} from 'entities/contact';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { socket } from 'shared/socket';
import { Socket } from 'socket.io-client';
import { eventChannel, EventChannel } from 'redux-saga';
import { IContact } from 'shared/types';
import axios, { AxiosResponse } from 'axios';
import { searchService } from 'entities/contact/api/search.service';
import { rejected } from 'entities/auth';
import { getContacts } from 'entities/contact/api/contacts.actions';
import { setSearchResult } from 'entities/contact/model/contacts.slice';

function* getContactsWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IContact[]> = yield call(searchService.getContacts);
    yield put(dataReceived(response.data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message));
    }
  } finally {
    yield put(finishLoading());
  }
}

function* addContactWorker(action: ReturnType<typeof addContact>) {
  try {
    put(startLoading());
    const response: AxiosResponse<IContact[]> = yield call(
      searchService.addContactRequeset,
      action.payload
    );
    put(dataReceived(response.data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message));
    }
  } finally {
    put(finishLoading());
  }
}

function* searchRequest(action: ReturnType<typeof searchContacts>) {
  if (socket) {
    console.log(action.payload);
    yield call([socket, socket.emit], 'search:request', action.payload);
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

    socket.on('search:response', eventHandler);

    socket.on('error', errorHandler);

    const unsubscribe = () => {
      socket.off('search:response', eventHandler);
    };

    return unsubscribe;
  });
}

export function* fetchSearch() {
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

export function* searchSagaWatcher() {
  yield takeEvery(searchContacts.type, searchRequest);
  yield takeEvery(addContact.type, addContactWorker);
  yield takeEvery(getContacts.type, getContactsWorker);
  yield fork(fetchSearch);
}
