import { put, takeEvery } from 'redux-saga/effects';
import { getCurrentUser } from './user.actions';
import { startLoading } from 'entities/user/model/user.slice';

function* handelGetCurrentUser(action: ReturnType<typeof getCurrentUser>) {
  try {
    put(startLoading());
  } catch (err) {
    console.log(err);
  }
}

export function* userSagaWatcher() {
  yield takeEvery(getCurrentUser.type, handelGetCurrentUser);
}