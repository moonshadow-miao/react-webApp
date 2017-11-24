import React from 'react'
import { render } from 'react-dom'
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'

const initialState = {};

const USER_INFO = ''

const rootReducer = function (state = initialState, action) {
  switch (action.type) {
    case USER_INFO:
      return action.data
    default:
      return state
  }
};



const store = createStore(rootReducer, initialState,
  // 触发 redux-devtools
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store