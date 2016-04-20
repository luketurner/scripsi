import * as React from 'react'
import {connect} from 'react-redux'

import {NodeType, SNode} from './types'
import {StateTree} from '../store'
import Icon, {IconType} from '../util/icon'

const styles: Dict<string> = require('./view.css')


interface NodeViewProps { 
  nodeId: string,
  node?: SNode
}

interface NodeViewState {
  outlined: boolean
}

/**
 * Use this generic component anytime you want to render a node. Pass it a nodeId
 * and it will look up the node in the state for you and render it with the appropriate
 * component for its node type.
 * 
 * @class NodeView
 * @extends {React.Component<NodeViewProps, {}>}
 */
class NodeView extends React.Component<NodeViewProps, NodeViewState> {
  constructor(props) {
    super(props)
    this.state = { outlined: false }
    this.outlineOn = this.outlineOn.bind(this)
    this.outlineOff = this.outlineOff.bind(this)
  }
  
  public render() {
    if (!this.props.node) {
      return <div />
    }
    let NodeTypeComponent = require('./nodetypes/' + NodeType[this.props.node.type].toLowerCase()).default
    return <div className={[styles['node'], this.state.outlined ? styles['outlined'] : ''].join(' ')}>
      <div className={styles['handle']} onMouseEnter={this.outlineOn} onMouseLeave={this.outlineOff}>
        <div>
          <Icon type={this.props.node.collapsed ? IconType.Plus : IconType.Minus} title={(this.props.node.collapsed ? 'Expand' : 'Collapse') + ' node'}/>
        </div>
      </div>
      <NodeTypeComponent node={this.props.node} />
    </div>
  }
  
  outlineOn() {
    this.setState({ outlined: true })
  }
  
  outlineOff() {
    this.setState({ outlined: false })
  }
}

const mapStateToProps = (state: StateTree, oldProps: NodeViewProps): NodeViewProps => {
  return {
    nodeId: oldProps.nodeId,
    node: state['nodes'][oldProps.nodeId]
  }
}

export default connect(mapStateToProps)(NodeView)