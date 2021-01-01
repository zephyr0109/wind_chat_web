// default
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// custom
import LoginInfo from '~src/domain/LoginInfo';
import User from '~src/domain/User';

// state
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SAGA } from '~src/action/sagaActionType';

// degign
import useStyles from '~src/design/useStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// util
import { Record } from 'immutable';
import IError from '~src/domain/IError';
import { CLEAR_ERROR } from '~src/action/actionType';

// 로그인 컴포넌트
function Login(props) {
  // 기본적인 상태 관리. UI 측면
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const user: User = useSelector((state) => state.user);
  const err: IError = useSelector((state) => state.error);

  // 사용자가 로그인이 되어 있는 상태인지 확인
  useEffect(() => {
    // TODO : 조건식 수정 필요
    if (user.userid && user.userid !== '') {
      history.push('/main');
    }
  }, [user]);

  // 에러가 발생했을 때
  useEffect(() => {
    if (err.err) {
      alert(err.code);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [err, dispatch]);

  //  로그인 전송 버튼 클릭 시
  const submitLoginInfo = (e: any) => {
    e.preventDefault();
    let obj: LoginInfo = { userId, password };
    dispatch({ type: LOGIN_SAGA, loginInfo: obj });
  };

  // enter 키를 누를 경우 로그인 함수 호출
  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      submitLoginInfo(e);
    }
  };
  return (
    <div className={classes.login}>
      {/* TODO : 페이지 상단 다국어 처리 필요*/}
      <h1>Login Page</h1>
      {/* id, password 입력 부분 */}
      <form className={classes.loginForm}>
        <TextField
          type="text"
          name="user_id"
          placeholder="e-mail"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        ></TextField>
        <br />
        <TextField
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onKeyPress={checkEnter}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>
        <br />
        {/* 로그인 처리 */}
        <Button onClick={submitLoginInfo}>sign in</Button>
        {/* 회원가입 페이지 이동 */}
        <Button>
          <Link to="/register">register</Link>
        </Button>
      </form>
    </div>
  );
}

export default Login;
