import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/index'
import Router from './router/index'
import 'antd/dist/antd.less'
import {setRem} from './utils/setRem'

setRem();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router></Router>
      </Provider>
    );
  }
}

export default App;
