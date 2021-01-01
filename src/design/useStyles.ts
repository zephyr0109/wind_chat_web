// material design용 hook. css 대신 활용

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  login: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    textAlign: 'center',
  },
  loginForm: {
    top: '30%',
  },
  widthHeight100: {
    width: '100%',
    height: '100%',
  },
  main: {},
  roomList: {},
  content: {},
  messageArea: {
    background: '#c7e1fb',
    width: '100%',
    height: '100%',
    minHeight: '200px',
  },
}));

export default useStyles;
