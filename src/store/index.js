import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import common from './common/index'

const rootState = {};
const reducer = combineReducers({
  common
});

let createStoreWithMiddleware = applyMiddleware()(createStore)
const store = createStoreWithMiddleware(reducer, rootState,
  // 触发 redux-devtools
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store