import userReducer from '~src/reducer/userReducer';
import roomReducer from '~src/reducer/roomReducer';
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';

const rootApp = combineReducers({
  user: userReducer,
  error: errorReducer,
  room: roomReducer,
});

export default rootApp;
