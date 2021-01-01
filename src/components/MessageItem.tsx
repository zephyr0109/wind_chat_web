import React from 'react';

import Message from '~src/domain/Message';

// 대화방 내 메시지 표시 컴포넌트
const MessageItem: Function = (props) => {
  const message: Message = props.message;
  console.log(message);

  // TODO : 디자인 변경
  return <div>{message.msg}</div>;
};

export default MessageItem;
