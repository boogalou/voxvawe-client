import { dataReceived, searchContacts } from 'entities/contact';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { socket } from 'shared/socket';
import { Socket } from 'socket.io-client';
import { eventChannel, EventChannel } from 'redux-saga';
import { IContact } from 'shared/types';

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
        yield put(dataReceived(response));
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export function* searchSagaWatcher() {
  yield takeEvery(searchContacts.type, searchRequest);
  yield fork(fetchSearch)
}
