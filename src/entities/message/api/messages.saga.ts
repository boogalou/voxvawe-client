import { call, put, takeLatest } from "redux-saga/effects";
import { getLatestMessagesAsync } from "entities/message/api/messages.actions";
import { startLoading, finishLoading, dataReceived, rejected,  } from "../model/message.slice";
import { messagesService } from "entities/message/api/messages.service";
import { AxiosResponse } from "axios";
import { IMessage } from "shared/types";

function* getLatestMessagesWorker(action: ReturnType<typeof getLatestMessagesAsync>) {
  try {
    console.log('getLatestMessagesWorker: ', action.payload);
    yield put(startLoading());

    const response: AxiosResponse<{chat_id: number, messages: IMessage[]}> = yield call(messagesService.getLatestMessages, action.payload)
    yield put(dataReceived(response.data));
    yield put(finishLoading())
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при получении сообщений');
  }
}

export function* messagesSagaWatcher() {
  yield takeLatest(getLatestMessagesAsync.type, getLatestMessagesWorker);
}