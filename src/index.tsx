// default
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// design
import '~src/design/index.css';

// state
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '~src/reducer/combine';
import rootSaga from '~src/action/rootSaga';

// custom component
import Login from '~container/Login';
import Register from '~container/Register';
import Main from '~container/Main';

// redux 기본 설정 추가
//const composedEnhancers = composeWithDevTools(...enhancers);
const sagaMiddleware = createSagaMiddleware();
// chrome 디버거 추가, dev 상태일 때
const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/main" component={Main}></Route>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
