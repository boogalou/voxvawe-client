import { all } from '@redux-saga/core/effects';
import { authWatcherSaga } from 'entities/auth';
import { userSagaWatcher } from 'entities/user';
import { searchSagaWatcher } from 'entities/contact';
import { fork } from 'redux-saga/effects';
import { fetchSearch } from 'entities/contact/api/contacts.saga';

export function* rootSaga() {
  yield all([authWatcherSaga(), userSagaWatcher(), searchSagaWatcher()]);
}
