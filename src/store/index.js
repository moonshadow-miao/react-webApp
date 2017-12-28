import {createStore, combineReducers, applyMiddleware,compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './reducer/index'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk,routerMiddleware(history)]

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

let store = null;
if(process.env === "development" && window.__REDUX_DEVTOOLS_EXTENSION__){
  store = createStore(
    combineReducers({
      reducers,
      router: routerReducer
    }),
    compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__()) // ;添加对浏览器调试工具(redux-devtools)的支持

  );
}else {
  store = createStore(
    combineReducers({
      reducers,
      router: routerReducer
    }),
    compose(applyMiddleware(...middleware))
  );
}

export default store


