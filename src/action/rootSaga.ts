import { all } from 'redux-saga/effects';
import { userSaga } from '~src/action/userAction';
import { roomSaga } from '~src/action/roomAction';
import { messageSaga } from '~src/action/messageAction';

// 전체 saga action 통합
export default function* rootSaga() {
  yield all([userSaga(), roomSaga(), messageSaga()]);
}
