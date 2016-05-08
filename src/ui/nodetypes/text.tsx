import * as React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'

import {SNode, NodeType} from '../../node/types'
import NodeView, { NodeTemplateProps } from '../snode'
import TextEditor, {EditorEventHandler} from '../../ui/editor'
import {update} from '../../util/update'


interface TextNodeTypeProps extends NodeTemplateProps {
  onReturn: EditorEventHandler
  onTab: EditorEventHandler
}

const textNodeView = (props: TextNodeTypeProps) => {
  const emitChange = (newContent) => {
    props.onChange(update<SNode,SNode>(props.node, { content: { $set: newContent } }))
  }
  return <div>
    { props.hidden || <TextEditor content={props.node.content}
                                  onChange={emitChange}
                                  onReturn={props.onReturn}
                                  onTab={props.onTab} /> }
    { props.node.collapsed || map(props.node.children, (child) => <NodeView key={child} nodeId={child} />) }
  </div>
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReturn: () => {
      dispatch({
        type: 'Node.AddBelow',
        existingNodeId: ownProps.node.id,
        node: {
          type: NodeType.Text
        }
      })
      return true
    },
    onTab: (e) => {
      dispatch({
        type: e.shiftKey ? 'Node.Promote' : 'Node.Demote',
        nodeId: ownProps.node.id
      })
      e.preventDefault()
    }
  }
}

export default connect((state) => state, mapDispatchToProps)(textNodeView)