// 대화 양식
export default interface Message {
  id?: string; // id가 선택적인 이유는 메시지를 보낸 직후 서버에서 응답 전 까지 id가 비어있을 것이기 때문에 공란으로 둠.
  roomId: string;
  writer: string;
  msg: string;
  writeTime?: Date; // 사용자가 전송을 시작한 시점이 아니라 서버에서 받아오는 시간으로 다시 설정
}
