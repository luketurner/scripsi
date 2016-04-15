import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {createStore, combineReducers} from 'redux'

import nodeReducer from './node/reducer'

import App from './layout/app'

require('file?name=[name].[ext]!./index.html')

const store = createStore(combineReducers({
  node: nodeReducer
}), {})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
