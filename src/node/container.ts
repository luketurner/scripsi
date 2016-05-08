import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'
import { SNode } from './types'

import { updateNode } from './actions'

import { NodeTemplateProps } from '../ui/snode'

interface NodeViewProps {
  nodeId: string
}

const mapStateToProps = (state, ownProps) => {
  return {
    node: state.nodes.db[ownProps.nodeId]
  }
}

const mapDispatchToProps = (dispatch, ownProps): any => {
  return {
    onChange: (newNode) => dispatch(updateNode(newNode)),
    onDragEnd: (droppedNodeId) => dispatch(updateNode({ id: ownProps.nodeId, parent: droppedNodeId }))
  }
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

export default compose<any, any, any>(
  connect<any, NodeViewProps, NodeTemplateProps>(mapStateToProps, mapDispatchToProps),
  dragSource,
  dropTarget)