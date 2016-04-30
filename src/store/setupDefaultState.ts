import {NodeType} from '../node/types'
import {keys} from 'lodash'

export default function () {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'Node.AddOrphan',
      node: {
        type: NodeType.Text,
        content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      }
    })

    dispatch({
      type: 'UI.SetDisplayNodeId',
      nodeId: keys(state.nodes.db)[0]
    })
  }
}