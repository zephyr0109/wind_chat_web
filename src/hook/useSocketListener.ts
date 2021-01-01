import { useState, useEffect } from 'react';
import { getSocket } from '~src/service/socketConnector';

// 소켓 전용 custom hook, 전송한 다음 응답이 아닌 대기중 서버로부터 수신 시 사용
function useSocketListener(socketEvent: string, defaultValue: any = null) {
  const [value, setValue] = useState(defaultValue);
  const socket = getSocket();

  // unmount시 해당 함수를 제거할 목적으로 별도로 선언함
  const callbackFunc: Function = (result) => {
    if (result) {
      setValue(result);
    }
  };
  socket.on(socketEvent, callbackFunc);

  useEffect(() => {
    return function cleanup() {
      // 사용한 컴포넌트가 해제될 때 리스너에서 제거
      socket.removeListener(socketEvent, callbackFunc);
    };
  }, [value]);

  return [value, setValue];
}

export default useSocketListener;
