// react
import React, { useEffect, useState } from 'react';

// state
import { useDispatch, useSelector } from 'react-redux';
import { ROOM_LIST_SAGA, ROOM_JOIN_SAGA } from '~src/action/sagaActionType';

// router
import { List } from 'immutable';

// material
import MList from '@material-ui/core/List';

// degisn
import useStyles from '~src/design/useStyles';
import classNames from 'classnames';

// custom component
import Room from '~src/domain/Room';
import RoomListItem from '~src/components/RoomListItem';

// 대화방 리스트
const RoomList = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // 컴포넌트가 불러오고 초기화가 안되었을 경우를 확인
  const [initialize, setInit] = useState(true);

  // 로그인 사용자 정보, 대화방 리스트
  const user = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const roomList = roomState.get('roomList');

  // 로그인 처리 이후 초기상태인 경우 대화방 목록 호출
  useEffect(() => {
    if (initialize && user.userid && user.userid !== '') {
      dispatch({ type: ROOM_LIST_SAGA, userid: user.userid });
      setInit(false);
    }
  }, [initialize, user, dispatch]);

  // 대화방 리스트 존재 여부 확인
  // TODO 해당 함수가 왜 필요한지 다시 확인 필요
  useEffect(() => {
    if (roomList && roomList.size > 0) {
      console.log(roomList.toJS());
    }
  }, [roomList]);

  // 대화방 입장 함수, 목록 클릭 시 실행
  const roomJoin = (e, room: Room) => {
    if (room.roomId) {
      dispatch({ type: ROOM_JOIN_SAGA, roomId: room.roomId });
    } else {
      console.log('wrong room selected');
    }
  };

  return (
    <div className={classNames(classes.roomList, classes.widthHeight100)}>
      <MList>
        {/* 대화방 목록 별 리스트 아이템 생성 */}
        {roomList.map((room, idx) => (
          <RoomListItem room={room} onClick={roomJoin} key={room.roomId} />
        ))}
      </MList>
    </div>
  );
};
export default RoomList;
