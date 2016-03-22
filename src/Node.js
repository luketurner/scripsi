import uuid from 'node-uuid'
import _ from 'lodash'

let nodes = {}

let defaults = {
  type: 'ListItem',
  content: '',
  children: []
}

export function createNode (params) {
  if (params.id) {
    throw new Error("createNode params include an 'id', but that's forbidden")
  }
  let node = {
    id: uuid.v4(),
    type: params.type || defaults.type,
    content: params.content || defaults.content,
    children: _.map(params.children || defaults.children,
                   (child) => createNode(child).id)
  }
  nodes[node.id] = node

  return node
}

export function getNode (id) {
  return nodes[id]
}
