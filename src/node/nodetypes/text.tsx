import * as React from 'react'

import {SNode, NodeTypeProps} from '../types'
import TextEditor from '../../ui/editor'
import {update} from '../../util/update'

export default (props: NodeTypeProps) => {
  const emitChange = (newContent) => {
    props.onChange(update<SNode,SNode>(props.node, { content: { $set: newContent } }))
  }
  return <TextEditor content={props.node.content} onChange={emitChange} />
}