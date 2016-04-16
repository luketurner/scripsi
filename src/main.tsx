import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {createStore, combineReducers, applyMiddleware} from 'redux'

import * as _ from 'lodash'

import nodeReducer from './node/reducer'
import { NodeActionType, NodeType } from './node/types'
import { LayoutActionType } from './layout/types'

import Layout from './layout/layout'
import layoutReducer from './layout/reducer'

require('file?name=[name].[ext]!./index.html')

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = createStore(combineReducers({
  nodes: nodeReducer,
  layout: layoutReducer
}), {}, applyMiddleware(logger))


store.dispatch({
  type: NodeActionType[NodeActionType.AddOrphan],
  node: {
    type: NodeType.Text,
    content: 'Test content'
  }
})

store.dispatch({
  type: LayoutActionType[LayoutActionType.SetDisplayNodeId],
  nodeId: _.keys(store.getState().nodes)[0]
})

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('app')
)
