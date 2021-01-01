import React from 'react';

// hook
import useInputValue from '~src/hook/useInputValue';

// material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

// 대화방 내 입력 창
// TODO : 아래의 파라미터를 typescript로 어떻게 적용해야 하는지 확인 필요
const ContentInput = ({ onClick, room }) => {
  // 입력 결과에 따른 state 변화
  const [textVal, onTextVal] = useInputValue('');

  // 대화 입력시
  const onBtnClick = (e) => {
    // 호출한 컴포넌트에서 함수를 받았을 경우 해당 함수에 이벤트와 텍스트를 돌려준다.
    if (onClick) {
      onClick(e, textVal);
    }
  };

  return (
    <FormGroup row={true}>
      <FormControl fullWidth={true}>
        {/* 텍스트 입력 부분 */}
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={1}
          placeholder="input here"
          variant="outlined"
          value={textVal}
          onChange={onTextVal}
        />
      </FormControl>
      <FormControl>
        {/* 전송 버튼 */}
        <Button variant="contained" color="primary" onClick={onBtnClick}>
          send
        </Button>
        {/* 기타 메뉴 추가시 하단 부분에 입력 */}
      </FormControl>
    </FormGroup>
  );
};

export default ContentInput;
