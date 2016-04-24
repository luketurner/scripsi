import {connect} from 'react-redux'

import {SearchState} from './search'
import {DBState} from './db'
import NodeTemplate, {NodeTemplateProps} from './template'

const mapStateToProps = (state, ownProps) => {
  return {
    node: state.nodes.db[ownProps.nodeId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (newNode) => dispatch({ 
      type: 'Node.UpdateNode',
      node: newNode
    })
  }
}

export interface NodeState {
  db: DBState,
  search: SearchState
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeTemplate)