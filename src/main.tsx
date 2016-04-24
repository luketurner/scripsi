import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import * as _ from 'lodash'

import { NodeType } from './node/types'
import { UIAction } from './ui/types'

import UI from './ui'

require('file?name=[name].[ext]!./index.html')

store.dispatch({
  type: 'Node.AddOrphan',
  node: {
    type: NodeType.Text,
    content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
  }
})

store.dispatch({
  type: 'UI.SetDisplayNodeId',
  nodeId: _.keys(store.getState().nodes.db)[0]
})

render(
  <Provider store={store}>
    <UI />
  </Provider>, 
  document.getElementById('app'))
