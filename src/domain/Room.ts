import Message from '~src/domain/Message';

// 대화방 인터페이스
interface Room {
  roomId: string;
  createTime: Date;
  name: string;
  users: Array<String>;
  owner: string;
  // 메시지를 대화방의 하위 속성으로 추가함.
  messages?: Array<Message>;
}

export default Room;
