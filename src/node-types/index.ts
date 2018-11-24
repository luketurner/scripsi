import { NodeAncestry, NodeType, SNode } from '../nodes';
import { NodeContext } from '../ui/node-view';

type NodeTypeComponent = React.StatelessComponent<NodeTypeProps>;

export interface INodeType {
  component: NodeTypeComponent;
}

export interface NodeTypeProps {
  node: SNode;
  context: NodeContext;
}

const registry = new Map<NodeType, INodeType>();
for (const nodeType of Object.values(NodeType)) {
  try {
    const definition = require('./definitions/' + nodeType).default;
    registry.set(nodeType, definition);
    console.debug('Loaded node type:', nodeType);
  } catch (e) {
    console.warn('Skipping unsupported node type:', nodeType);
  }
}

export const getComponent = (nodeType: NodeType): NodeTypeComponent | undefined => {
  const def = registry.get(nodeType);
  if (!def) { throw new Error(`Could not find definition for node type ${nodeType}.`); }
  return def ? def.component : undefined;
};
