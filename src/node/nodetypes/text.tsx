import * as React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'

import {SNode, NodeType} from '../types'
import NodeView from '../index'
import {NodeTemplateProps} from '../template'
import TextEditor from '../../ui/editor'
import {update} from '../../util/update'


interface TextNodeTypeProps extends NodeTemplateProps {
  onReturn: Function
}

const textNodeView = (props: TextNodeTypeProps) => {
  const emitChange = (newContent) => {
    props.onChange(update<SNode,SNode>(props.node, { content: { $set: newContent } }))
  }
  return <div>
    { props.hidden || <TextEditor content={props.node.content} onChange={emitChange} onReturn={props.onReturn} /> }
    { props.node.collapsed || map(props.node.children, (child) => <NodeView key={child} nodeId={child} />) }
  </div>
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReturn: () => {
      let node = ownProps.node
      let action = {
        type: 'Node.AddChild',
        node: { type: NodeType.Text, parent: node.id }
      }
      
      // In some cases, it doesn't make sense to create a child node.
      // But we need to be sure we have a parent before we make a sibling.
      if (node.parent && (node.children.length === 0 || node.collapsed)) {
        action.type = 'Node.AddSibling'
        action.node.parent = node.parent
        action['oldSiblingId'] = node.id
      }
      dispatch(action)
      return true
    }
  }
}

export default connect((state) => state, mapDispatchToProps)(textNodeView)