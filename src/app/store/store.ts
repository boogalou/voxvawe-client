import { configureStore } from '@reduxjs/toolkit';
import { logger } from './middleware';
import { rootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    })
      .concat(logger)
      .concat(sagaMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;



sagaMiddleware.run(rootSaga);
