
import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './modules';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxThunk, logger),
});

export default store;
