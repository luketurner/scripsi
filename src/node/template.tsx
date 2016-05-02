import * as React from 'react'
import {connect} from 'react-redux'
import {DragSource} from 'react-dnd'

import {NodeType, SNode} from './types'
import Icon, {IconType} from '../ui/icon'

const styles: Dict<string> = require('./template.css')


export interface NodeTemplateProps { 
  node: SNode
  onChange: { (newNode: SNode): void }
  onDragEnd: { (droppedNodeId: string): void }
  connectDragSource: { (target: any): any }
  connectDropTarget: { (target: any): any }
  hidden: boolean
}

interface NodeTemplateState {
  outlined: boolean
}

/**
 * Use this generic component anytime you want to render a node. Pass it a nodeId
 * and it will look up the node in the state for you and render it with the appropriate
 * component for its node type.
 * 
 * @class NodeTemplate
 * @extends {React.Component<NodeTemplateProps, NodeTemplateState>}
 */
class NodeTemplate extends React.Component<NodeTemplateProps, NodeTemplateState> {
  constructor(props) {
    super(props)
    this.state = { outlined: false }
    this.outlineOn = this.outlineOn.bind(this)
    this.outlineOff = this.outlineOff.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
  }

  public render() {
    if (!this.props.node) {
      return <div />
    }
    let NodeTypeComponent = require('./nodetypes/' + NodeType[this.props.node.type].toLowerCase()).default
    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className={[styles['node'], this.state.outlined ? styles['outlined'] : ''].join(' ')}>
        <div className={styles['handle']}
             onMouseEnter={this.outlineOn}
             onMouseLeave={this.outlineOff}
             onClick={this.toggleCollapsed} />
        <NodeTypeComponent node={this.props.node} onChange={this.props.onChange} hidden={this.props.hidden} />
      </div>
    ))
  }
  
  outlineOn() {
    this.setState({ outlined: true })
  }
  
  outlineOff() {
    this.setState({ outlined: false })
  }
  
  toggleCollapsed () {
    let node = this.props.node
    node.collapsed = !node.collapsed
    this.props.onChange(node)
  }
}

export default NodeTemplate