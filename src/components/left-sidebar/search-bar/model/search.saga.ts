import { call, put, takeEvery } from 'redux-saga/effects';
import { searchUserRequest } from 'components/left-sidebar/search-bar/model/search.actions';
import { searchService } from 'components/left-sidebar/search-bar/api/search.service';
import axios, { AxiosResponse } from 'axios';

function* searchUserSagaWorker(action: ReturnType<typeof searchUserRequest>) {
  console.log(action.payload);
  const response: AxiosResponse = yield call(searchService.search, action.payload);
  console.log('searchUserSagaWorker: ', response.data);



}

export function* searchWatcherSaga() {
  yield takeEvery(searchUserRequest.type, searchUserSagaWorker);

}
