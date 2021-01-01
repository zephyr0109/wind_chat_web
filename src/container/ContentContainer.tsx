import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// custom component
import ContentTitle from '~src/components/ContentTitle';

// design
import useStyles from '~src/design/useStyles';
import classNames from 'classnames';

// material
import Grid from '@material-ui/core/Grid';
import ContentInput from '~src/components/ContentInput';

// domain
import Room from '~src/domain/Room';
import User from '~src/domain/User';
import Message from '~src/domain/Message';

// action type
import { MESSAGE_SEND_SAGA } from '~src/action/sagaActionType';
import MessageItem from '~src/components/MessageItem';

// 대화방 컨테이너 컴포넌트
const ContentContainer = (props) => {
  // 접속 중인 대화방
  const room = useSelector((state) => state.room);
  const joinRoom: Room = room.get('joinRoom');

  // 로그인 사용자 정보
  const user: User = useSelector((state) => state.user);

  const classes = useStyles();
  const dispatch = useDispatch();

  // 메시지 전송
  const sendMessage = (e, value) => {
    if (joinRoom) {
      let message: Message = {
        roomId: joinRoom.roomId,
        msg: value,
        writer: user.userid,
      };
      dispatch({ type: MESSAGE_SEND_SAGA, message: message });
      console.log(message);
    }
  };

  return (
    <div className={classNames(classes.widthHeight100, classes.content)}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.widthHeight100}>
          <ContentTitle></ContentTitle>
        </Grid>
        <Grid item className={classes.widthHeight100}>
          {/* 대화방 내 메시지를 순차적으로 표시 */}
          {joinRoom && joinRoom.messages ? (
            joinRoom.messages.map((message) => (
              <MessageItem key={message.id} message={message}></MessageItem>
            ))
          ) : (
            <></>
          )}
        </Grid>
        {/* 대화방내 입력창 */}
        <Grid item className={classes.widthHeight100}>
          <ContentInput onClick={sendMessage} room={joinRoom} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContentContainer;
