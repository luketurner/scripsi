import * as React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'

import {SNode, NodeType} from '../types'
import NodeView from '../index'
import {NodeTemplateProps} from '../template'
import TextEditor, {EditorEventHandler} from '../../ui/editor'
import {update} from '../../util/update'

const classes = require('./listitem.css')


interface ListItemNodeTypeProps extends NodeTemplateProps {
  onReturn: EditorEventHandler
  onTab: EditorEventHandler
}

const listItemNodeView = (props: ListItemNodeTypeProps) => {
  const emitChange = (newContent) => {
    props.onChange(update<SNode,SNode>(props.node, { content: { $set: newContent } }))
  }
  return <div class="item">
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
          type: NodeType.ListItem
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

export default connect((state) => state, mapDispatchToProps)(listItemNodeView)