export function getConfig (state) {
  return state.nodes[state.configNodeId].content
}

export function getNode (state, id) {
  return state.nodes[id]
}
