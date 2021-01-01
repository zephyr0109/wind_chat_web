import React from 'react';
import Room from '~src/domain/Room';

// material
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// util
import { dateFormat } from '~src/service/dateUtils';

// 메인 화면 왼쪽 대화방 아이템 목록
const RoomListItem = ({ room, onClick }) => {
  // const room: Room = props.room;
  // const onClick = props.onClick || null;

  const roomJoin = (e) => {
    e.preventDefault();
    if (onClick) {
      // onClick을 상위에서 받아 이벤트와 대화방 정보를 전달
      onClick(e, room);
    }
  };

  return (
    <ListItem onClick={roomJoin}>
      <ListItemAvatar>
        <Avatar alt={room.name}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={room.name}
        secondary={dateFormat('yyyy-MM-dd HH:mm:ss', room.createTime)}
      />
    </ListItem>
  );
};

export default RoomListItem;
