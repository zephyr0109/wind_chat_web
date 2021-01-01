import { List, Record } from 'immutable';
import { ROOM_LIST, ROOM_JOIN, MESSAGE_RECEIVE } from '~src/action/actionType';
import Message from '~src/domain/Message';
import Room from '~src/domain/Room';

const roomList = List<Room>();
// 이 안에서만 사용할 목적이라 별도로 분리하지 않음
interface RoomState {
  // 입장한 대화방
  joinRoom: Room;
  // 대화방 목록
  roomList: List<Room>;
}

const defaultValue: RoomState = {
  joinRoom: null,
  roomList: roomList,
};

const roomRecoder: Record.Factory<RoomState> = Record(defaultValue);
const roomState = roomRecoder();

// TODO 대화방 관련 리듀서로 메시지 처리도 같이 하되 이 안에서 별도의 분리가 필요할 것으로 보임.
const roomReducer = (state = roomState, action) => {
  switch (action.type) {
    // 대화방 조회 결과를 설정
    case ROOM_LIST:
      if (action.roomList) {
        state = state.set('roomList', List(action.roomList));
      }
      return state;
    // 대화방 입장 시
    case ROOM_JOIN:
      if (action.joinRoom) {
        state = state.set('joinRoom', action.joinRoom);
      }
      return state;
    // 메시지 수신 시
    case MESSAGE_RECEIVE:
      if (action.message) {
        // 접속 한 대화방 내 메시지 추가
        let messages: Array<Message> = state.getIn(['joinRoom', 'messages']);
        if (!messages) {
          messages = new Array<Message>();
        }
        messages.push(action.message);
        // 최종 상태에 반영
        state = state.setIn(['joinRoom', 'messages'], messages);
      }
      return state;
    default:
      return state;
  }
};

export default roomReducer;
