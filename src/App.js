import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Router from './routers/index'
import store from './store/index'

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
