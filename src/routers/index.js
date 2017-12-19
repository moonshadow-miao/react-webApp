import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import asyncComponent from '../utils/Bundlle'
import {Modal} from 'antd-mobile';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as actions from '../store/actions/indexList'
import {storeCities} from '../store/actions/common'

const alert = Modal.alert;

const Index = asyncComponent(() => import("../containers/Index"),  {...actions, storeCities,component:'index'});
const Login = asyncComponent(() => import("../containers/Login"));
const ForgetPwd = asyncComponent(() => import("../containers/ForgetPwd"));
const Register = asyncComponent(() => import("../containers//Register"));

const history = createHistory({
  getUserConfirmation: (message, callback) => {
    let res = new Promise((resolve, reject) => {
      alert('提示', message, [
        {text: '取消', onPress: () => reject(false)},
        {text: '确认', onPress: () => resolve(true)},
      ]);
    });
    res.then(() => {callback(true)}).catch(() => {callback(false)})
  }
});

history.block((location, action) => {
  if (location.pathname === '/register' && action === 'POP') {
    return '确认离开当前页面?'
  }
  if (location.pathname === '/forget-pwd' && action === 'POP') {
    return '确认离开当前页面?'
  }
  if (location.pathname === '/login' && action === 'POP') {
    return '确认离开当前页面?'
  }
})

// history.listen((location, action) => {
//   console.log(`The current URL is ${location.pathname},search:${location.search},hash:${location.hash}`)
//   console.log(`The last navigation action was ${action}`)
// });

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

const animate = (Component) => ({match, ...rest}) => (
  <ReactCSSTransitionGroup transitionName="transitionWrapper" component={firstChild} transitionEnterTimeout={400} transitionLeaveTimeout={400}>{match && <Component {...rest} />}</ReactCSSTransitionGroup>)

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" children={animate(Index)}/>
          <Route exact path="/login" children={animate(Login)}/>
          <Route exact path="/forget-pwd" children={animate(ForgetPwd)}/>
          <Route exact path="/register" children={animate(Register)}/>
        </div>
      </ConnectedRouter>);
  }
}

export default Router


