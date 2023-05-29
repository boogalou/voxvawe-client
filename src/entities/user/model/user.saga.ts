import { call, put, takeEvery } from 'redux-saga/effects';
import { getCurrentUser } from './user.actions';
import { dataReceived, finishLoading, startLoading } from 'entities/user/model/user.slice';
import { AxiosResponse } from 'axios';
import { IUser } from '@/src/shared';
import { userService } from 'entities/user';

function* getCurrentUserWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IUser> = yield call(userService.getCurrentUser);
    yield put(dataReceived(response.data))
  } catch (err) {
    console.log(err);
  } finally {
    yield put(finishLoading());
  }
}

export function* userSagaWatcher() {
  yield takeEvery(getCurrentUser.type, getCurrentUserWorker);
}