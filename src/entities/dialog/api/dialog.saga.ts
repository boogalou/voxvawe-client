import { Socket } from 'socket.io-client';
import { AxiosResponse } from 'axios';
import { call, debounce, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import {
  addNewMemberToGroupAsync,
  connectToRoomAsync,
  createGroupDataAsync,
  getDialogsAsync,
  leaveRoomAsync,
  sendMessageAsync,
  setMessageIsReadAsync,
  typingTextAsync,
} from 'entities/dialog/api/dialog.actions';
import {
  dataReceived,
  finishLoading,
  setTyping,
  startLoading,
  updateDialogs,
} from 'entities/dialog';
import { dialogService } from './dialog.service';
import { getAccessToken } from 'entities/user';
import { addMessage, setMessageIsRead } from 'entities/message';
import { MessageResponse } from 'entities/dialog/api/dialog.interface';
import {
  ERROR_CONNECT,
  ERROR_RESPONSE,
  GET_MESSAGE_STATUS,
  JOIN_PRIVATE_ROOM,
  JOINED_PRIVATE_ROOM,
  LEAVE_PRIVATE_ROOM,
  LEFT_PRIVATE_ROOM,
  NEW_MESSAGE,
  SEND_MESSAGE,
  SET_MESSAGE_STATUS,
  TYPING_NOTIFY,
  TYPING_TEXT,
} from './dialog.constants';
import { connectSocket } from 'shared/services/socket/connect-socket';
import { IDialog } from 'shared/types';
import { store } from 'app/store';
import { playSoundOnNewMessage } from 'shared/lib';
import { IAttachments } from 'shared/types/message.interface';

function* getDialogsWorker() {
  try {
    yield put(startLoading('loading'));
    const response: AxiosResponse<IDialog[]> = yield call(dialogService.getDialogs);
    yield put(dataReceived(response.data));
    yield put(finishLoading('succeeded'));
  } catch (error) {
    console.log(error);
    yield put(finishLoading('succeeded'));
  }
}

function* createGroupDataWorker({ payload }: ReturnType<typeof createGroupDataAsync>) {
  if (payload.files && payload.files instanceof File) {
    const file = payload.files;
    const formDataFile = new FormData();
    formDataFile.append('file', file, file.name);
    yield put(startLoading('loading'));
    const response: AxiosResponse<IAttachments[]> = yield call(
      dialogService.uploadImages,
      formDataFile
    );

    const groupData = {
      ...payload,
      files: response.data[0].url,
    };

    yield call(dialogService.createGroup, groupData);
    yield put(finishLoading('succeeded'));
  }
}

function* addNewMemberWorker({ payload }: ReturnType<typeof addNewMemberToGroupAsync>) {
  try {
    if (!payload) {
      throw new Error('Нет данных');
    }

    yield put(startLoading('loading'));
    const response: AxiosResponse = yield call(dialogService.addNewMember, payload);
    yield put(updateDialogs(response.data));
    yield put(finishLoading('succeeded'));
  } catch (error) {
    console.log(error);
    yield put(finishLoading('succeeded'));
  }
}

function* connectToRoom(socket: Socket, { payload }: ReturnType<typeof connectToRoomAsync>) {
  try {
    if (socket) {
      yield call([socket, socket.emit], JOIN_PRIVATE_ROOM, payload);
    }
  } catch (error) {
    console.log(error);
  }
}

function* leaveRoomWorker(socket: Socket, { payload }: ReturnType<typeof leaveRoomAsync>) {
  try {
    if (socket && payload.chatId) {
      yield call([socket, socket.emit], LEAVE_PRIVATE_ROOM, payload);
    }
  } catch (error) {
    console.log(error);
  }
}

function* sendMessage(socket: Socket, { payload }: ReturnType<typeof sendMessageAsync>) {
  try {
    if (socket && payload.voice_message) {
      const response: AxiosResponse = yield call(dialogService.uploadVoice, payload.voice_message);
      payload.voice_message = yield response.data;
      yield call([socket, socket.emit], SEND_MESSAGE, payload);
      return;
    }

    if (socket && payload.attachments) {
      const response: AxiosResponse = yield call(dialogService.uploadImages, payload.attachments);
      payload.attachments = yield response.data;
      yield call([socket, socket.emit], SEND_MESSAGE, payload);
    } else {
      yield call([socket, socket.emit], SEND_MESSAGE, payload);
    }
  } catch (error) {
    console.log(error);
  }
}

function* notifyTypingWorker(socket: Socket, action: ReturnType<typeof typingTextAsync>) {
  try {
    if (socket) {
      yield call([socket, socket.emit], TYPING_TEXT, action.payload);
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateMessageWorker(socket: Socket, action: ReturnType<typeof setMessageIsReadAsync>) {
  if (socket) {
    yield call([socket, socket.emit], SET_MESSAGE_STATUS, action.payload);
  }
}

function* notificationWorker({ payload }: MessageResponse) {
  const accountId = store.getState().userSlice.user.account_id;
  if (payload.sender_id !== accountId) {
    yield call(playSoundOnNewMessage);
  }
}

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel(emit => {
    const eventHandler = (response: MessageResponse) => {
      emit(response);
    };

    const errorHandler = (errorEvent: Error) => {
      emit(new Error(errorEvent.message));
    };

    socket.on(JOINED_PRIVATE_ROOM, eventHandler);
    socket.on(NEW_MESSAGE, eventHandler);
    socket.on('CHAT:NEW_UNREAD_MESSAGE', eventHandler);
    socket.on(TYPING_NOTIFY, eventHandler);
    socket.on(GET_MESSAGE_STATUS, eventHandler);
    socket.on(LEFT_PRIVATE_ROOM, eventHandler);
    socket.on(ERROR_RESPONSE, errorHandler);
    socket.on(ERROR_CONNECT, errorHandler);


    return () => {
      socket.off(JOINED_PRIVATE_ROOM, eventHandler);
      socket.off(NEW_MESSAGE, eventHandler);
      socket.off('CHAT:NEW_UNREAD_MESSAGE', eventHandler);
      socket.off(TYPING_NOTIFY, eventHandler);
      socket.off(GET_MESSAGE_STATUS, eventHandler);
      socket.off(LEFT_PRIVATE_ROOM, eventHandler);
    };
  });
}

function* fetchMessageWorker(socket: Socket): Generator<any, void, any> {
  if (socket) {
    const socketChannel: EventChannel<Socket> = yield call(createSocketChannel, socket);
    while (true) {
      try {
        const response: MessageResponse = yield take(socketChannel);
        switch (response.type) {
          case JOINED_PRIVATE_ROOM:
            console.log(response.payload);
            break;

          case LEFT_PRIVATE_ROOM:
            console.log(response.payload);
            break;

          case NEW_MESSAGE:
            yield put(addMessage(response.payload));
            yield call(notificationWorker, response);
            break;

          case 'CHAT:NEW_UNREAD_MESSAGE':
            yield put(addMessage(response.payload));
            yield call(notificationWorker, response);
            break;

          case TYPING_NOTIFY:
            yield put(setTyping(response.payload));
            break;

          case GET_MESSAGE_STATUS:
            yield put(setMessageIsRead(response.payload));
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
  yield takeLatest(createGroupDataAsync.type, createGroupDataWorker);
  yield takeLatest(addNewMemberToGroupAsync.type, addNewMemberWorker);

  const token = yield take(getAccessToken.type);
  const socket = yield call(connectSocket, token);

  yield takeEvery(connectToRoomAsync.type, connectToRoom, socket);
  yield takeEvery(leaveRoomAsync.type, leaveRoomWorker, socket);
  yield takeEvery(sendMessageAsync.type, sendMessage, socket);
  yield takeEvery(setMessageIsReadAsync.type, updateMessageWorker, socket);
  yield debounce(200, typingTextAsync.type, notifyTypingWorker, socket);
  yield fork(fetchMessageWorker, socket);
}
