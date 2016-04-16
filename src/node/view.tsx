import * as React from 'react'
import {connect} from 'react-redux'

import {NodeType, SNode} from './types'
import {StateTree} from '../types'

interface NodeViewProps { 
  nodeId: string,
  node?: SNode
}

/**
 * Use this generic component anytime you want to render a node. Pass it a nodeId
 * and it will look up the node in the state for you and render it with the appropriate
 * component for its node type.
 * 
 * @class NodeView
 * @extends {React.Component<NodeViewProps, {}>}
 */
class NodeView extends React.Component<NodeViewProps, {}> {
  public render() {
    if (!this.props.node) {
      return <div />
    }
    let NodeTypeComponent = require('./nodetypes/' + NodeType[this.props.node.type].toLowerCase()).default
    console.log(this.props.node)
    return <NodeTypeComponent node={this.props.node} />
  }
}

const mapStateToProps = (state: StateTree, oldProps: NodeViewProps): NodeViewProps => {
  return {
    nodeId: oldProps.nodeId,
    node: state['nodes'][oldProps.nodeId]
  }
}

export default connect(mapStateToProps)(NodeView)