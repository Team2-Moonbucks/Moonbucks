import { combineReducers } from 'redux';
import authReducer from './authReducer';
// 다른 리듀서들을 import

const rootReducer = combineReducers({
  auth: authReducer,
  // 다른 리듀서들
});

export default rootReducer;
