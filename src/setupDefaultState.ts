import {NodeType} from './node/types'
import {keys} from 'lodash'

export default function (store) {
  console.log('setup')
  store.dispatch({
    type: 'Node.AddOrphan',
    node: {
      type: NodeType.Text,
      content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
    }
  })

  store.dispatch({
    type: 'UI.SetDisplayNodeId',
    nodeId: keys(store.getState().nodes.db)[0]
  })
}