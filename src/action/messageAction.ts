import { put, takeEvery } from 'redux-saga/effects';
import { sendAndResponse } from '~service/socketConnector';
import { MESSAGE_SEND } from '~src/action/actionType';
import { MESSAGE_SEND_SAGA } from '~src/action/sagaActionType';
import socketEvent from '~src/resources/socketEvent';

// 메시지 전송
function* sendMessage(action) {
  let result = yield sendAndResponse(socketEvent.MSG_SEND, action.message);
  if (!result.err) {
    yield put({ type: MESSAGE_SEND, message: result.message });
  } else {
    yield put({ type: MESSAGE_SEND, err: result.err, code: result.code });
  }
}

export function* messageSaga() {
  yield takeEvery(MESSAGE_SEND_SAGA, sendMessage);
}
