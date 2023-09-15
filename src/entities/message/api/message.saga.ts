import { call, put, takeLatest } from 'redux-saga/effects';
import {
  dataReceived,
  finishLoading,
  getLatestMessagesAsync,
  messagesService,
  startLoading,
} from 'entities/message';
import { AxiosResponse } from 'axios';
import { InMessage } from 'shared/types';

function* getLatestMessagesWorker({ payload }: ReturnType<typeof getLatestMessagesAsync>) {
  try {
    yield put(startLoading());
    const response: AxiosResponse = yield call(messagesService.getLatestMessages, payload);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при получении сообщений');
  }
}

export function* messagesSagaWatcher(): Generator<any, void, any> {
  yield takeLatest(getLatestMessagesAsync.type, getLatestMessagesWorker);
}
