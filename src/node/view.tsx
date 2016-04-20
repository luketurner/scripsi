import * as React from 'react'
import {connect} from 'react-redux'
import {create as createStyler} from 'react-free-style'

import {NodeType, SNode} from './types'
import {StateTree} from '../store'
import {registerStyles} from '../util/style'
import Icon, {IconType} from '../util/icon'


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
    return <div className={[classes['node'], this.state.outlined ? classes['outlined'] : ''].join(' ')}>
      <div className={classes['handle']} onMouseEnter={this.outlineOn} onMouseLeave={this.outlineOff}>
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

const styler = createStyler()

let classes = registerStyles(styler, {
  node: {
    display: 'flex',
    padding: '0.25rem',
    borderRadius: '0.125rem',
    border: '1px dashed rgba(0, 0, 0, 0)' // Use invisible border so node content doesn't shift when border's added
  },
  outlined: {
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  handle: {
    width: '1rem',
    height: '1rem',
    borderRadius: '3px',
    display: 'flex',
    marginRight: '0.25rem',
    alignItems: 'center',
    fontSize: '0.5em',
    fill: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    '& > *': { display: 'none' },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      '& > *': { display: 'flex' }
    }
  }
})

export default connect(mapStateToProps)(styler.component(NodeView))