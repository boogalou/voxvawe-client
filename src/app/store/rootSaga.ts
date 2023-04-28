import { all } from '@redux-saga/core/effects';
import { authWatcherSaga } from 'entities/auth';
import { searchWatcherSaga } from 'components/left-sidebar/search-bar/model';




export function* rootSaga() {
  yield all([authWatcherSaga(), searchWatcherSaga()]);
}