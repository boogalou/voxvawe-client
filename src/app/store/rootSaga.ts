import { all } from '@redux-saga/core/effects';
// import { authWatcherSaga } from "../../features/auth/model/auth.saga";


export function* rootSaga() {
  yield all([
    // authWatcherSaga(),
  ]);
}