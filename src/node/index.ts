import {connect} from 'react-redux'
import {DragSource, DropTarget} from 'react-dnd'

import {SearchState} from './search'
import {DBState} from './db'
import NodeTemplate, {NodeTemplateProps} from './template'
import {SNode} from './types'

const mapStateToProps = (state, ownProps) => {
  return {
    node: state.nodes.db[ownProps.nodeId]
  }
}

const mapDispatchToProps = (dispatch, ownProps): any => {
  return {
    onChange: (newNode) => dispatch({ 
      type: 'Node.UpdateNode',
      node: newNode
    }),
    onDragEnd: (droppedNodeId) => dispatch({
      type: 'Node.ChangeParent',
      nodeId: ownProps.nodeId,
      parentId: droppedNodeId
    })
  }
}

export interface NodeState {
  db: DBState,
  search: SearchState
}

export interface NodeViewProps {
  nodeId: string
}

const dragSource = DragSource<NodeTemplateProps>('node', {
  beginDrag: (props) => {
    return { id: props.node.id }
  },
  endDrag: (props, monitor) => {
    if (monitor.didDrop()) {
      const dropResult = <{ id: string }>monitor.getDropResult()
      props.onDragEnd(dropResult.id)
    }
  }
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}))

const dropTarget = DropTarget<NodeTemplateProps>('node', {
  drop: (props, monitor) => {
    if (monitor.didDrop()) { return }
    return { id: props.node.id }
  },
  canDrop: (props, monitor) => {
    let item = <{ id: string }>monitor.getItem()
    return !(item.id === props.node.id || item.id === props.node.parent)
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))

export default connect<any,NodeTemplateProps,NodeViewProps>(mapStateToProps, mapDispatchToProps)(dragSource(dropTarget(NodeTemplate)))