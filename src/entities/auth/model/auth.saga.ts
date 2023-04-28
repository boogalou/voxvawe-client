import {call, put, takeEvery} from 'redux-saga/effects'
import {checkAuthRequest, loginRequest, logoutRequest, registrationRequest} from "./auth.actions";
import {authService} from "../api";
import {dataReceived, finishLoading, rejected, setIsAuthenticated, startLoading} from "./auth.slice";
import axios, {AxiosResponse} from "axios";
import { IAuthRsponseData } from 'shared/types/auth.interface';


function* signinSagaWorker(action: ReturnType<typeof loginRequest>) {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthRsponseData> = yield call(authService.signin, action.payload);
    localStorage.setItem('token', response.data.user.accessToken);
    yield put(dataReceived(response.data));
    yield put(setIsAuthenticated());
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message))
    }
  } finally {
    yield put(finishLoading());
  }
}

function* signupSagaWorker(action: ReturnType<typeof loginRequest>) {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthRsponseData> = yield call(authService.signup, action.payload);
    yield put(dataReceived(response.data))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message))
    }
    throw new Error('An error occurred: ' + `${JSON.stringify(err)}`);
  } finally {
    yield put(finishLoading());
  }
}

function* authCheckSagaWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthRsponseData> = yield call(authService.checkAuth);
    console.log('authCheckSagaWorker: ', response)
    localStorage.setItem('token', response.data.user.accessToken);
    yield put(dataReceived(response.data))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message))
    }
  } finally {
    yield put(finishLoading());
  }
}

function* authLogoutSagaWorker() {
  try {
    yield put(startLoading());
    const response: AxiosResponse<IAuthRsponseData> = yield call(authService.logout);
    console.log(response)
    localStorage.removeItem('token')
    put(dataReceived({} as IAuthRsponseData))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(rejected(err.response?.data.message))
    }
  } finally {
    yield put(finishLoading());
  }
}

export function* authWatcherSaga() {
  yield takeEvery(registrationRequest.type, signupSagaWorker);
  yield takeEvery(loginRequest.type, signinSagaWorker);
  yield  takeEvery(checkAuthRequest.type, authCheckSagaWorker)
  yield  takeEvery(logoutRequest.type, authLogoutSagaWorker)
}