import * as React from 'react'

import {SNode} from '../types'

export default (props: { node: SNode }) => {
  return <div>{ props.node.content }</div>
}