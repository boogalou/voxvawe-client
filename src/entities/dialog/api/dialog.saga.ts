import { Socket } from 'socket.io-client';
import { AxiosResponse } from 'axios';
import { call, debounce, fork, put, take, takeEvery } from "redux-saga/effects";
import { EventChannel, eventChannel } from 'redux-saga';
import {
  connectToRoomAsync,
  getDialogsAsync,
  sendMessageAsync, typingTextAsync
} from "entities/dialog/api/dialog.actions";
import { dataReceived, finishLoading, startLoading } from '../model/dialogs.slice';
import { dialogService } from 'entities/dialog/api/index';
import { getAccessToken } from 'entities/user';
import { addMessage } from 'entities/message';
import { MessageResponse } from 'entities/dialog/api/dialog.interface';
import {
  ERROR_RESPONSE,
  JOIN_PRIVATE_ROOM,
  JOINED_PRIVATE_ROOM,
  NEW_MESSAGE,
  SEND_MESSAGE, TYPING_NOTIFY, TYPING_TEXT
} from "entities/dialog/api/dialog.constants";
import { connectSocket } from 'shared/services/socket/connect-socket';
import { IDialog } from 'shared/types';
import { store } from "app/store";
import { playSoundOnNewMessage } from "shared/lib";

function* getDialogsWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IDialog[]> = yield call(dialogService.getDialogs);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (error) {
    console.log(error);
    yield put(finishLoading());
  }
}

function* connectToRoom(socket: Socket, action: ReturnType<typeof connectToRoomAsync>) {
  try {
    if (socket) {
      yield call([socket, socket.emit], JOIN_PRIVATE_ROOM, action.payload);
    }
  } catch (error) {
    console.log(error);
  }
}

function* sendMessage(socket: Socket, action: ReturnType<typeof sendMessageAsync>) {
  try {
    if (socket) {
      if (action.payload.attachments) {
        console.log('отправлено attachments');
        const response: AxiosResponse = yield call(
          dialogService.uploadAttachments,
          action.payload.attachments
        );

        action.payload.attachments = yield response.data;
        yield call([socket, socket.emit], SEND_MESSAGE, action.payload);
      } else {
        console.log('отправлено no attachments');
        yield call([socket, socket.emit], SEND_MESSAGE, action.payload);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* notifyTypingWorker(socket: Socket, action: ReturnType<typeof typingTextAsync>) {
  try {
    if (socket) {
      yield call([socket, socket.emit], TYPING_TEXT, action.payload)
    }
  } catch (err) {
    console.log(err);
  }
}

function* playSoundOnNewMessageWorker({ payload }: MessageResponse) {
  const accountId = store.getState().userSlice.user.account_id;
  if (payload.sender_id !== accountId) {
    playSoundOnNewMessage();
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
    socket.on(TYPING_NOTIFY, eventHandler);
    socket.on(ERROR_RESPONSE, errorHandler);

    const unsubscribe = () => {
      socket.off(JOINED_PRIVATE_ROOM, eventHandler);
      socket.off(NEW_MESSAGE, eventHandler);
      socket.off(TYPING_NOTIFY, eventHandler);
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
        switch (response.type) {
          case JOINED_PRIVATE_ROOM:
            break;

          case NEW_MESSAGE:
            yield call(playSoundOnNewMessageWorker, response)
            yield put(addMessage(response.payload));
            break;

          case TYPING_NOTIFY:
            yield put(dataReceived(response.payload));
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
  const socket = yield call(connectSocket, token);

  yield takeEvery(connectToRoomAsync.type, connectToRoom, socket);
  yield takeEvery(sendMessageAsync.type, sendMessage, socket);
  yield debounce(1000, typingTextAsync.type, notifyTypingWorker, socket);
  yield fork(fetchMessageWorker, socket);
}
