import { eventChannel, EventChannel } from 'redux-saga';
import { call, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import {
  dataReceived,
  ERROR_RESPONSE,
  finishLoading,
  GET_MESSAGE_IS_READ,
  getLatestMessagesAsync,
  IMessageActions, SET_MESSAGE_IS_READ, setMessageIsRead,
  setMessageIsReadAsync,
  startLoading
} from "entities/message";
import { messagesService } from 'entities/message';
import { AxiosResponse } from 'axios';
import { InMessage } from 'shared/types';
import { Socket } from 'socket.io-client';
import { connectSocket } from 'shared/services';
import { getAccessToken } from 'entities/user';

function* getLatestMessagesWorker(action: ReturnType<typeof getLatestMessagesAsync>) {
  try {
    yield put(startLoading());

    const response: AxiosResponse<{ chat_id: number; messages: InMessage[] }> = yield call(
      messagesService.getLatestMessages,
      action.payload
    );
    yield put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при получении сообщений');
  }
}

function* setMessageIsReadWorker(socket: Socket, action: ReturnType<typeof setMessageIsReadAsync>) {
  if (socket) {
    console.log('REQUEST SET IS REACD');
    yield call([socket, socket.emit], SET_MESSAGE_IS_READ, action.payload)
  }
}

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel(emit => {
    const eventHandler = (payload: IMessageActions) => {
      console.log('eventHandler: ', payload);
      emit(payload);
    };

    const errorHandler = (errorEvent: { reason: string | undefined }) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on('MESSAGE:GET_MESSAGE_IS_READ', eventHandler);
    socket.on(ERROR_RESPONSE, errorHandler);

    const unsubscribe = () => {

    };

    return unsubscribe;
  });
}

function* fetchMessageWorker(socket: Socket): Generator<any, void, any> {
  if (socket) {
    const socketChannel: EventChannel<any> = yield call(createSocketChannel, socket);
    while (true) {
      try {
        const response: IMessageActions = yield take(socketChannel);
        console.log(response );
        switch (response.type) {
          case 'MESSAGE:GET_MESSAGE_IS_READ':
            console.log('GET_MESSAGE_IS_READ:', response.payload);
            yield put(setMessageIsRead(response.payload))
            break;

          case ERROR_RESPONSE:
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

export function* messagesSagaWatcher(): Generator<any, void, any> {
  yield takeLatest(getLatestMessagesAsync.type, getLatestMessagesWorker);

  const token = yield take(getAccessToken.type);
  const socket = yield call(connectSocket, token);

  yield takeEvery(setMessageIsReadAsync.type, setMessageIsReadWorker, socket);
  yield fork(fetchMessageWorker, socket);
}
