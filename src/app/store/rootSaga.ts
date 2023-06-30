import { all } from '@redux-saga/core/effects';
import { authWatcherSaga } from 'entities/auth';
import { userSagaWatcher } from 'entities/user';
import { contactsSagaWatcher } from 'entities/contact';
import { dialogSagaWatcher } from 'entities/dialog/api/dialog.saga';

export function* rootSaga() {
  yield all([authWatcherSaga(), contactsSagaWatcher(), dialogSagaWatcher(), userSagaWatcher(),]);
}
