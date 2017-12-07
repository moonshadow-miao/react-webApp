import React, { Component } from 'react';
import { Provider } from 'react-redux'
import router from './routers/index'
const {store ,Router} = router

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
