import { v4 as uuidv4 } from 'node-uuid'
import { SNode, SNodeOptions, NodeType, NodeDisplayStatus } from '../types'

/**
 * Constructs a valid node out of a potentially incomplete list of options.
 * 
 * @param {SNodeOptions} options Options define properties on the resulting node
 * @returns {SNode} An SNode ready for insertion into the state tree
 */
export default function constructNode (options: SNodeOptions | SNode): SNode {  
  if (isNode(options)) {
    return options
  }

  return {
    id: uuidv4(),
    type: options.type || NodeType.Text,
    content: options.content || '',
    props: options.props || {},
    parent: options.parent || '',
    displayStatus: options.displayStatus || NodeDisplayStatus.Expanded,
    children: options.children || [],
    collapsed: options.collapsed || false
  }
}

function isNode(nopts: SNode | SNodeOptions): nopts is SNode {
  return !!(<SNode>nopts).id
}