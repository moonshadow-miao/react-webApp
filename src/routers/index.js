import React, {Component} from 'react';
import {createStore, combineReducers, applyMiddleware,compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import asyncComponent from '../utils/Bundlle'

import reducers from './reducers'

const Index = asyncComponent(() => import("../containers/Index"));

const Login = asyncComponent(() => import("../containers/Login"));


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    // ...reducers,
    router: routerReducer
  }),
  compose(applyMiddleware(middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // ;添加对浏览器调试工具(redux-devtools)的支持
)

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Index}/>
          <Route exact path="/login" component={Login}/>
        </div>
      </ConnectedRouter>);
  }
}

export default {
  store,
  Router
}

