import { observer } from 'mobx-react';
import * as React from 'react';
import { NodeContext, NodeView } from '.';
import { SNode } from '../../nodes';

interface ChildNodeListProps {
  node: SNode;
  context: NodeContext;
}

export const ChildNodeList = observer(({ node, context }: ChildNodeListProps) => (
  <div>
    {node.collapsed
      ? null
      : (node.children || []).map((child: Uuid, ix: number) =>
        <NodeView nodeId={child} ancestry={context.ancestry.concat([[node.id, ix]])} key={child} />)}
  </div>
));
