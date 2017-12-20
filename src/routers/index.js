import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import asyncComponent from '../utils/Bundlle'

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import history from './history'
import {storeCities} from '../store/actions/common'
import {getIndexImg} from '../store/actions/indexList'



const Index = asyncComponent(() => import("../containers/Index"), {storeCities, getIndexImg, component: 'index'});
const Login = asyncComponent(() => import("../containers/Login"));
const ForgetPwd = asyncComponent(() => import("../containers/ForgetPwd"));
const Register = asyncComponent(() => import("../containers/Register"));
const Search = asyncComponent(() => import("../containers/Search"));
const FindRooms = asyncComponent(() => import("../containers/FindRooms"));
const Miss = asyncComponent(() => import("../containers/Miss"));


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
          <Route exact path="/search" children={animate(Search)}/>
          <Route exact path="/find-rooms" children={animate(FindRooms)}/>
          <Route component={Miss}/>
        </div>
      </ConnectedRouter>);
  }
}

export default Router


