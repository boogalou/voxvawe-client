import io, { Socket } from 'socket.io-client';
import { AxiosResponse } from 'axios';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import {
  connectToRoomAsync,
  getDialogsAsync,
  sendMessageAsync,
} from 'entities/dialog/api/dialog.actions';
import { dataReceived, finishLoading, startLoading } from '../model/dialogs.slice';
import { socketConfig } from 'shared/services/';
import { dialogService } from 'entities/dialog/api/index';
import { getAccessToken } from 'entities/user';
import { API_URL } from 'shared/constants';
import { IDialog } from 'shared/types';
import { addMessage } from 'entities/message';
import { MessageResponse } from 'entities/dialog/api/dialog.interface';
import {
  ERROR_RESPONSE,
  JOIN_PRIVATE_ROOM,
  JOINED_PRIVATE_ROOM,
  NEW_MESSAGE,
  SEND_MESSAGE,
} from 'entities/dialog/api/dialog.constants';

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

function* getDialogsWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IDialog[]> = yield call(dialogService.getDialogs);
    console.log('диалоги: ', response.data);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (error) {
    console.log(error);
    yield put(finishLoading());
  }
}

function* connectToRoom(socket: Socket, action: ReturnType<typeof connectToRoomAsync>) {
  console.log('проверочка', action.payload);
  try {
    if (socket) {
      yield call([socket, socket.emit], JOIN_PRIVATE_ROOM, action.payload);
    }
  } catch (error) {
    console.log(error);
  }
}

function* sendMessage(socket: Socket, action: ReturnType<typeof sendMessageAsync>) {
  console.log('sendMessage: ', action.payload);
  try {
    if (socket) {
      yield call([socket, socket.emit], SEND_MESSAGE, action.payload);
    }
  } catch (error) {
    console.log(error);
  }
}

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel(emit => {
    const eventHandler = (payload: MessageResponse) => {
      emit(payload);
    };

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on(JOINED_PRIVATE_ROOM, eventHandler);
    socket.on(NEW_MESSAGE, eventHandler);
    socket.on(ERROR_RESPONSE, errorHandler);

    const unsubscribe = () => {
      socket.off(JOINED_PRIVATE_ROOM, eventHandler);
      socket.off(NEW_MESSAGE, eventHandler);
    };

    return unsubscribe;
  });
}

function* fetchMessageWorker(socket: Socket): Generator<any, void, any> {
  if (socket) {
    const socketChannel: EventChannel<any> = yield call(createSocketChannel, socket);
    while (true) {
      try {
        const response: MessageResponse = yield take(socketChannel);
        console.log(response.type);
        switch (response.type) {
          case JOINED_PRIVATE_ROOM:
            console.log(response.payload);
            break;

          case NEW_MESSAGE:
            yield put(addMessage(response.payload));
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

export function* dialogSagaWatcher(): Generator<any, void, any> {
  yield takeEvery(getDialogsAsync.type, getDialogsWorker);

  const token = yield take(getAccessToken.type);
  const socket = yield call(connectToSocket, token);

  yield takeEvery(connectToRoomAsync.type, connectToRoom, socket);
  yield takeEvery(sendMessageAsync.type, sendMessage, socket);
  yield fork(fetchMessageWorker, socket);
}
