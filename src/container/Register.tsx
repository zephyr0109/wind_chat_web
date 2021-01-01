import React from 'react';
import { getSocket } from '~service/socketConnector';
import socketEvent from '~resources/socketEvent';
import User from '~domain/User';
import useInputState from '~hook/useInputValue';

// TODO 회원 가입 영역, 디자인 개선 필요
function Register() {
  const [userid, changeUserId] = useInputState('');
  const [password, changePassword] = useInputState('');
  const [name, changeName] = useInputState('');
  const [birth_day, changeBirthDay] = useInputState('');

  // 회원가입 데이터 전송
  const registerUser = (e) => {
    e.preventDefault();
    // TODO 유효성 처리 확인 필요
    // TODO 소켓 전송 부분을 saga로 빼야 역할이 맞을 것으로 보임.
    // TODO 가입완료 후 페이지 이동 필요. 해당 결과는 여기에서 받을 수 없을 것으로 보임.
    let socket = getSocket();
    let userObj: User = {
      userid,
      password,
      name,
      birth_day: new Date(),
    };
    socket.emit(socketEvent.USER_REGISTER, userObj);
  };

  return (
    <div className="register">
      <form>
        userid:{' '}
        <input
          type="text"
          name="userid"
          onChange={changeUserId}
          value={userid}
        ></input>
        <br />
        password :{' '}
        <input
          type="password"
          name="password"
          onChange={changePassword}
          value={password}
        ></input>
        <br />
        name :{' '}
        <input
          type="text"
          name="name"
          onChange={changeName}
          value={name}
        ></input>
        <br />
        birth_day :{' '}
        <input
          type="date"
          name="date"
          onChange={changeBirthDay}
          value={birth_day}
        ></input>
        <br />
        <button onClick={registerUser}>register</button>
      </form>
    </div>
  );
}

export default Register;
