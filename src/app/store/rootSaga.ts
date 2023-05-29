import { all } from '@redux-saga/core/effects';
import { authWatcherSaga } from 'entities/auth';
import { userSagaWatcher } from 'entities/user';
import { searchSagaWatcher } from 'entities/contact';
import { dialogSagaWather } from 'entities/dialog/model/dialog.saga';

export function* rootSaga() {
  yield all([authWatcherSaga(), userSagaWatcher(), searchSagaWatcher(), dialogSagaWather()]);
}
