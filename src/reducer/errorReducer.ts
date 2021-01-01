import { Record } from 'immutable';
import { LOGIN_FAIL, CLEAR_ERROR } from '~src/action/actionType';
import IError from '~src/domain/IError';

let error: IError = {
  err: false,
  code: '',
};

let ErrorRecord: Record.Factory<IError> = Record(error);
let errState = ErrorRecord();

// 범용적으로 사용할 에러상태 관리
const errorReducer = (state = errState, action) => {
  let newState = state;
  switch (action.type) {
    case LOGIN_FAIL:
      newState = newState.set('err', action.err);
      newState = newState.set('code', action.code);
      return newState;
    case CLEAR_ERROR:
      newState = ErrorRecord(error);
      return newState;
    default:
      return state;
  }
};

export default errorReducer;
