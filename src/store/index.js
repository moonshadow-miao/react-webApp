import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './reducer/index'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)]

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

// 仅在开发环境中让redux的调试工具可见
let composes = process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__()) : compose(applyMiddleware(...middleware));

let store = createStore(combineReducers({reducers, router: routerReducer}), composes);

export default store




