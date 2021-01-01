import io from 'socket.io-client';
import config from '~config/config';
let socket: SocketIOClient.Socket;

// 소켓 접속 함수
export function connectServer() {
  // 소켓 url
  let url: string = config.server_host + ':' + config.server_port;
  // 소켓 옵션 설정
  let opt: SocketIOClient.ConnectOpts = {};
  opt.forceNew = true;
  opt.timeout = 1000;
  // 소켓 생성
  socket = io(url, opt);
}

export function getSocket(): SocketIOClient.Socket {
  return socket;
}

// 비동기 방식으로 이벤트 수신 시 resolve 시킴
// TODO 소켓 데이터 변경 후 에러코드가 넘어올 때 reject 시키는 소스 추가 필요
export function sendAndResponse(
  sendEvent: string,
  data: any,
  recvEvent: string = ''
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    try {
      if (recvEvent === '') {
        recvEvent = sendEvent;
      }
      // 이벤트 추가
      const callbackFunc: Function = (result) => {
        // once 대신 on으로 받고 제거하는데, 이는 후에 이벤트가 꼬이지 않게 고유값을 넘기고
        // 해당 이벤트를 안전하게 제거하기 위한 장치를 염두에 둠
        socket.off(recvEvent, callbackFunc);
        resolve(result);
      };
      socket.on(recvEvent, callbackFunc);
      socket.emit(sendEvent, data);
    } catch (e) {
      // 어떤식으로든 에러가 발생하면 reject
      console.log(e);
      reject(e);
    }
  });
}
// 소켓 접속 실행
connectServer();
