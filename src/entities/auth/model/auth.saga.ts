import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  checkAuthRequestAsync,
  loginRequestAsync,
  logoutRequestAsync,
  registrationRequestAsync,
} from './auth.actions';
import { authService } from '../api';
import {
  dataReceived,
  finishLoading,
  logout,
  rejected,
  setIsAuth,
  startLoading,
} from './auth.slice';
import axios, { AxiosResponse } from 'axios';
import { IAuthResponseData } from 'shared/types/auth.interface';
import { toggleOnlineStatus } from 'entities/user';

function* signinSagaWorker(action: ReturnType<typeof loginRequestAsync>) {
  console.log('signi: ', action.payload);
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthResponseData> = yield call(authService.signin, action.payload);
    console.log(response.data.user.access_token);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
    yield put(setIsAuth());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data));
      yield put(finishLoading());
    }
  }
}

function* signupSagaWorker(action: ReturnType<typeof registrationRequestAsync>) {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthResponseData> = yield call(authService.signup, action.payload);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message));
      yield put(finishLoading());
    }
  }
}

function* authCheckSagaWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthResponseData> = yield call(authService.checkAuth);
    yield put(dataReceived(response.data));
    yield put(finishLoading());
    yield put(setIsAuth());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.warn(err.response?.data.message);
      yield put(rejected(err.response?.data.message));
      yield put(finishLoading());
    }
  }
}

function* authLogoutSagaWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthResponseData> = yield call(authService.logout);
    console.log('authLogoutSagaWorker', response);
    yield put(logout());
    yield put(finishLoading());
    yield put(toggleOnlineStatus(false));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message));
    }
  }
}

export function* authWatcherSaga() {
  yield takeLatest(registrationRequestAsync.type, signupSagaWorker);
  yield takeLatest(loginRequestAsync.type, signinSagaWorker);
  yield takeEvery(checkAuthRequestAsync.type, authCheckSagaWorker);
  yield takeLatest(logoutRequestAsync.type, authLogoutSagaWorker);
}
