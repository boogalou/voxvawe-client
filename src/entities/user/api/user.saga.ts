import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import { ERROR_RESPONSE, getAccessToken, getCurrentUserAsync, OFFLINE, ONLINE } from './user.actions';

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
import { IStatusUpdateResponse } from 'entities/user/api/status.interface';

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
    const eventHandler = (response: IStatusUpdateResponse) => {
      console.log(response);
      emit(response);
    };

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on(ONLINE, eventHandler);
    socket.on(OFFLINE, eventHandler);
    socket.on(ERROR_RESPONSE, errorHandler);

    return () => {
      socket.off(ONLINE, eventHandler);
      socket.off(OFFLINE, eventHandler);

    };
  });
}

function* fetchUserStatusWorker(socket: Socket) {
  if (socket) {
    const socketChannel: EventChannel<Socket> = yield call(createSocketChannel, socket);
    while (true) {
      try {
        const response: IStatusUpdateResponse = yield take(socketChannel);

        switch (response.type) {
          case ONLINE:
            console.log('contact ' + response.payload + ' online');
            yield put(updateContactStatus({ accountId: response.payload, status: true }));
            break;

          case OFFLINE:
            console.log('contact ' + response.payload + ' online');
            yield put(updateContactStatus({ accountId: response.payload, status: false }));
            break;

          default:
            console.log('default case');
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
}

function* handleAccessToken(action: ReturnType<typeof getAccessToken>): Generator<any, void, any> {
  const socket = yield call(connectSocket, action);
  yield fork(fetchUserStatusWorker, socket);
}

export function* userSagaWatcher(): Generator<any, void, any> {
  yield takeLatest(getCurrentUserAsync.type, getCurrentUserWorker);
  yield takeLatest(getAccessToken.type, handleAccessToken);
}
