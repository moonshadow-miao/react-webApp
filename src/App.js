import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './static/css/App.css';
import store from './store/index'
import Router from './router/index'
import 'antd/dist/antd.css';

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
