import * as React from 'react'

import {SNode, NodeType} from '../types'

class TextNodeView extends React.Component<{ node: SNode }, {}> {
  public render() {
    return <div>{ this.props.node.content }</div>
  }
}

export default TextNodeView