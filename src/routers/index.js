import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router'
import {ConnectedRouter} from 'react-router-redux'
import asyncComponent from '../utils/Bundlle'

const Index = asyncComponent(() => import("../containers/Index"));
const Login = asyncComponent(() => import("../containers/Login"));
const ForgetPwd = asyncComponent(() => import("../containers/ForgetPwd"));
const Register = asyncComponent(() => import("../containers//Register"));

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Index}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/forget-pwd" component={ForgetPwd}/>
          <Route exact path="/register" component={Register}/>
        </div>
      </ConnectedRouter>);
  }
}

export default Router


