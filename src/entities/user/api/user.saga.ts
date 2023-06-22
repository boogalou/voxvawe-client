import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import { getAccessToken, getCurrentUserAsync, updateUserOnlineStatusAsync } from './user.actions';

import { AxiosResponse } from 'axios';
import { IUser } from 'shared/types';
import {
  dataReceived,
  finishLoading,
  startLoading,
  toggleOnlineStatus,
  userService,
} from 'entities/user';
import io, { Socket } from 'socket.io-client';
import { API_URL } from 'shared/constants';
import { socketConfig } from 'shared/services';
import { setContacts, updateContactStatus } from 'entities/contact/model/contacts.slice';
import { setDialogs } from 'entities/dialog';

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

function* getCurrentUserWorker() {
  try {
    yield put(startLoading(true));
    const response: AxiosResponse<IUser> = yield call(userService.getCurrentUser);
    const { contacts, dialogs } = response.data;
    yield put(dataReceived(response.data));
    yield put(setContacts(contacts));
    yield put(setDialogs(dialogs));
    yield put(finishLoading(false));
    yield put(toggleOnlineStatus(true));
  } catch (err) {
    console.log(err);
  }
}

function* updateUserStatusWorker(socket: Socket, action: ReturnType<typeof updateUserOnlineStatusAsync>) {
  console.log('updateUserStatusWorker: ', action.payload);
  try {
    if (socket) {
      yield call([socket, socket.emit], 'USER:STATUS_UPDATE', action.payload);
    }
  } catch (err) {
    throw new Error('Ошибка соединения');
  }
}

function createSocketChannel(socket: Socket) {
  return eventChannel(emit => {
    const eventHandler = (payload: string) => {
      emit(payload);
    };

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on('USER:CHANGED_STATUS', eventHandler);

    socket.on('ERROR_RESPONSE', errorHandler);

    const unsubscribe = () => {
      socket.off('USER:CHANGED_STATUS', eventHandler);
    };

    return unsubscribe;
  });
}

function* fetchUserStatusWorker(socket: Socket) {
  if (socket) {
    const socketChannel: EventChannel<Socket> = yield call(createSocketChannel, socket);

    while (true) {
      try {
        const response: { accountId: string; username: string; status: string } = yield take(
          socketChannel
        );
        console.log(response);
        yield put(updateContactStatus(response));
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export function* userSagaWatcher(): Generator<any, void, any> {
  let token;

  while (true) {
    yield takeEvery(getCurrentUserAsync.type, getCurrentUserWorker);

    if (!token) {
      token = yield take(getAccessToken.type);
    }
    const action: ReturnType<typeof updateUserOnlineStatusAsync> = yield take(
      updateUserOnlineStatusAsync.type
    );
    const socket = yield call(connectToSocket, token);
    yield fork(updateUserStatusWorker, socket, action);
    yield fork(fetchUserStatusWorker, socket);
  }
}
