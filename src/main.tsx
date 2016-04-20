import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import * as _ from 'lodash'

import { NodeActionType, NodeType } from './node/types'
import { LayoutActionType } from './layout/types'

import Layout from './layout/layout'

require('file?name=[name].[ext]!./index.html')

store.dispatch({
  type: ['NodeActionType', NodeActionType.AddOrphan],
  node: {
    type: NodeType.Text,
    content: 'Test content'
  }
})

store.dispatch({
  type: ['LayoutActionType', LayoutActionType.SetDisplayNodeId],
  nodeId: _.keys(store.getState().nodes)[0]
})

render(
  <Provider store={store}>
    <Layout />
  </Provider>, 
  document.getElementById('app'))
