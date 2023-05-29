import { call, put, takeEvery } from 'redux-saga/effects';
import { getDialogs } from 'entities/dialog/model/dialog.actions';
import { dataReceived, finishLoading, startLoading } from './dialogs.slice';
import { AxiosResponse } from 'axios';
import { IDialog } from '@/src/shared';
import { dialogService } from 'entities/dialog/api';

function* getDialogsWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IDialog[]> = yield call(dialogService.getDialogs);
    console.log(response.data);
    yield put(dataReceived(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(finishLoading());
  }
}

export function* dialogSagaWather() {
  yield takeEvery(getDialogs.type, getDialogsWorker);
}
