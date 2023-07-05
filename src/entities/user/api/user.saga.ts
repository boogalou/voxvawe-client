import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import { ERROR, getAccessToken, getCurrentUserAsync, OFFLINE, ONLINE } from './user.actions';

import { AxiosResponse } from 'axios';
import { IUser } from 'shared/types';
import {
  dataReceived,
  finishLoading,
  startLoading,
  toggleOnlineStatus,
  userService,
} from 'entities/user';
import { Socket } from 'socket.io-client';
import { setContacts, updateContactStatus } from 'entities/contact/model/contacts.slice';
import { connectSocket } from 'shared/services/socket/connect-socket';

function* getCurrentUserWorker() {
  try {
    yield put(startLoading(true));
    const response: AxiosResponse<IUser> = yield call(userService.getCurrentUser);
    yield put(dataReceived(response.data));
    const { contacts } = response.data;
    if (contacts) {
      yield put(setContacts(contacts));
    }

    yield put(finishLoading(false));
    yield put(toggleOnlineStatus(true));
  } catch (err) {
    console.log(err);
    yield put(finishLoading(false));
  }
}

function createSocketChannel(socket: Socket) {
  return eventChannel(emit => {
    const eventHandler = (eventType: string, accountId: string) => {
      emit({ eventType, accountId });
    };

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on(ONLINE, payload => eventHandler(ONLINE, payload));
    socket.on(OFFLINE, payload => eventHandler(OFFLINE, payload));
    socket.on(ERROR, errorHandler);

    const unsubscribe = () => {
      socket.off(ONLINE, eventHandler);
      socket.off(OFFLINE, eventHandler);
      socket.off(ERROR, eventHandler);
    };

    return unsubscribe;
  });
}

function* fetchUserStatusWorker(socket: Socket) {
  if (socket) {
    const socketChannel: EventChannel<Socket> = yield call(createSocketChannel, socket);

    while (true) {
      try {
        const { eventType, accountId }: { eventType: string; accountId: string } = yield take(
          socketChannel
        );
        console.log('contact ' + accountId + ' online');
        if (eventType === ONLINE) {
          yield put(updateContactStatus({ accountId, status: true }));
        }

        if (eventType === OFFLINE) {
          console.log('contact ' + accountId + ' offline');
          yield put(updateContactStatus({ accountId, status: false }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

function* handleAccessToken(action: ReturnType<typeof getAccessToken>): Generator<any, void, any> {
  console.log(action);
  const socket = yield call(connectSocket, action);
  yield fork(fetchUserStatusWorker, socket);
}

export function* userSagaWatcher(): Generator<any, void, any> {
  yield takeLatest(getCurrentUserAsync.type, getCurrentUserWorker);
  yield takeLatest(getAccessToken.type, handleAccessToken);
}
