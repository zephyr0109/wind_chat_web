import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

// state
import { useSelector, useDispatch } from 'react-redux';
import { MESSAGE_RECEIVE } from '~src/action/actionType';

// material
import Grid from '@material-ui/core/Grid';

// degisn
import useStyles from '~src/design/useStyles';
import classNames from 'classnames';

// custom component
import RoomList from '~container/RoomList';
import ContentContainer from './ContentContainer';
import FunctionalContainer from './FunctionalContainer';
import useSocketListener from '~src/hook/useSocketListener';
import socketEvent from '~src/resources/socketEvent';

// 로그인 후 첫 화면
function Main(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // 메시지 수신 시 처리할 소켓 이벤트
  const [msgReceive] = useSocketListener(socketEvent.MESSAGE_RECEIVE);

  const user = useSelector((state) => state.user);

  // 메시지 수신 시
  useEffect(() => {
    if (msgReceive) {
      dispatch({ type: MESSAGE_RECEIVE, message: msgReceive });
    }
  }, [msgReceive]);

  // TODO : 로그인 처리여부에 따라 메인페이지 이동. 로그인 로직이 변경되면 아래의 소스도 변경 필요
  useEffect(() => {
    if (user.userid === '') {
      history.push('/');
    }
  }, [user]);

  return (
    <div className={classNames(classes.main, classes.widthHeight100)}>
      <Grid container className={classes.widthHeight100}>
        {/* 대화방 리스트 */}
        <Grid item xs={2}>
          <RoomList></RoomList>
        </Grid>
        {/* 들어간 대화방 */}
        <Grid item xs={8}>
          <ContentContainer></ContentContainer>
        </Grid>
        {/* 오른쪽 기능 영역 */}
        <Grid item xs={2}>
          <FunctionalContainer></FunctionalContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Main;
