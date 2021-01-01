import { Record } from 'immutable';
import { LOGIN } from '~src/action/actionType';
import User from '~src/domain/User';

let user: User = {
  userid: '',
  name: '',
  password: '',
  authorities: '',
  birth_day: new Date(),
  creation: new Date(),
  ip: '',
  last_access: new Date(),
  locked: false,
};

let UserRecord: Record.Factory<User> = Record(user);
let userState = UserRecord();

// TODO 사용자 관련 리듀서로 회원가입도 추가해야하는지 검토 필요
const userReducer = (state = userState, action) => {
  switch (action.type) {
    // 사용자 로그인
    case LOGIN:
      let userData = action.user;
      let newState = state.set('userid', userData.userid);
      newState = newState.set('name', userData.name);
      newState = newState.set('password', userData.password);
      newState = newState.set('authorities', userData.authorities);
      newState = newState.set('birth_day', new Date(userData.birth_day));
      newState = newState.set('creation', userData.creation);
      newState = newState.set('ip', userData.ip);
      newState = newState.set('last_access', new Date(userData.last_access));
      newState = newState.set('locked', userData.locked);
      return newState;

    default:
      return state;
  }
};

export default userReducer;
