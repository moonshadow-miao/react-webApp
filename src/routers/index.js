import React, {Component} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {Route} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import asyncComponent from '../utils/Bundlle'

import reducers from './reducers'

const Index = asyncComponent(() => import("../containers/Index"));

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
  applyMiddleware(middleware)
)

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Index}/>
        </div>
      </ConnectedRouter>);
  }
}

export default {
  store,
  Router
}

