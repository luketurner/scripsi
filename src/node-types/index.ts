import { NodeAncestry, NodeType, SNode } from '../nodes';
import { NodeContext } from '../ui/node-view';
import { observer } from 'mobx-react-lite';

type NodeTypeComponent = React.StatelessComponent<NodeTypeProps>;
type ContainerComponent = React.StatelessComponent<ContainerProps>
export interface INodeType {
  component: NodeTypeComponent;
  container?: ContainerComponent;
  menuEntries?: NodeTypeComponent;
  toHTML?: NodeTypeComponent;
}

export interface ContainerProps {
  children: React.ReactNode;
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

export const getDefinition = (nodeType: NodeType): INodeType => {
  const def = registry.get(nodeType);
  if (!def) { throw new Error(`Could not find definition for node type ${nodeType}.`); }
  return def;
};
