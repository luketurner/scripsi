import * as React from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { partial } from 'lodash'

import { NodeType, SNode } from '../../node/types'
import NodeContainer from '../../node/container'
import Icon, { IconType } from '../icon'
import Menu from '../menu'
import { update } from '../../util/update'

const styles: Dict<string> = require('./index.css')


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
@NodeContainer()
export default class NodeTemplate extends React.Component<NodeTemplateProps, NodeTemplateState> {
  state = {
    outlined: false
  }

  public render() {
    if (!this.props.node) {
      return <div />
    }
    const convertNodeType = (nodeType) => ({
      type: 'Node.UpdateNode',
      node: update(this.props.node, { type: { $set: nodeType } })
    })
    const menuItems = [{
        label: 'Delete node',
        actionCreator: () => ({ type: 'Node.DeleteNode', nodeId: this.props.node.id })
      }, {
        label: 'Convert to...',
        items: [{
          label: 'Plain text',
          actionCreator: partial(convertNodeType, NodeType.Text)
        }, {
          label: 'List item',
          actionCreator: partial(convertNodeType, NodeType.ListItem)
        }]
      }
    ]
    let NodeTypeComponent = require('../nodetypes/' + NodeType[this.props.node.type].toLowerCase()).default
    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className={[styles['node'], this.state.outlined ? styles['outlined'] : ''].join(' ')}>
        <div className={styles['handle']}
             onMouseEnter={this.outlineOn.bind(this)}
             onMouseLeave={this.outlineOff.bind(this)}
             onClick={this.toggleCollapsed.bind(this)} />
        <Menu items={menuItems} />
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