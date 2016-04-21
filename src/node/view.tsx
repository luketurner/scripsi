import {connect} from 'react-redux'

import {NodeType, SNode, NodeActionType} from './types'
import {StateTree} from '../store'
import NodeTemplate, {NodeTemplateProps} from './template'

interface NodeViewProps {
  nodeId: string
}

const mapStateToProps = (state: StateTree, ownProps: NodeViewProps) => {
  return {
    node: state['nodes'][ownProps.nodeId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (newNode) => dispatch({ 
      type: ['NodeActionType', NodeActionType.UpdateNode],
      node: newNode
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeTemplate)