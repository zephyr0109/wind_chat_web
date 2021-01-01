import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import socketEvent from '~src/resources/socketEvent';
import { sendAndResponse } from '~src/service/socketConnector';
import { ROOM_LIST_SAGA, ROOM_JOIN_SAGA } from './sagaActionType';
import { ROOM_JOIN, ROOM_LIST } from './actionType';

// 대화방 조회 부분 action
function* roomListSaga(action) {
  if (!action.userid) {
    return;
  }
  const result = yield sendAndResponse(socketEvent.ROOM_LIST, {
    userid: action.userid,
  });
  //TODO: 서버쪽 응답 결과가 바뀔 예정이므로 아래쪽 소스도 변경 예정
  if (!result.err) {
    yield put({ type: ROOM_LIST, roomList: result.roomList });
  }
}

// 대화방 입장
function* roomJoinSaga(action) {
  if (!action.roomId) {
    return;
  }
  const result = yield sendAndResponse(socketEvent.ROOM_JOIN, {
    roomId: action.roomId,
  });
  //TODO: 서버쪽 응답 결과가 바뀔 예정이므로 아래쪽 소스도 변경 예정
  yield put({ type: ROOM_JOIN, joinRoom: result.room });
}

// TODO:  아래쪽 watcher 부분을 함수 하나로 할 수 있는지 확인 필요
function* roomJoinWatcher() {
  yield takeLatest(ROOM_JOIN_SAGA, roomJoinSaga);
}

function* roomListWatcher() {
  yield takeEvery(ROOM_LIST_SAGA, roomListSaga);
}

export function* roomSaga() {
  yield all([roomJoinWatcher(), roomListWatcher()]);
}
