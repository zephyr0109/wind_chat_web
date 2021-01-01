import { put, takeEvery } from 'redux-saga/effects';
import { sendAndResponse } from '~service/socketConnector';
import { LOGIN, LOGIN_FAIL } from '~src/action/actionType';
import { LOGIN_SAGA } from '~src/action/sagaActionType';

// 로그인 처리
function* loginUser(action) {
  let result = yield sendAndResponse('login', action.loginInfo);
  if (!result.err) {
    yield put({ type: LOGIN, user: result });
  } else {
    yield put({ type: LOGIN_FAIL, err: result.err, code: result.code });
  }
}

export function* userSaga() {
  yield takeEvery(LOGIN_SAGA, loginUser);
}
