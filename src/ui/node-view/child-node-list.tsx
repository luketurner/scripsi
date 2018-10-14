import { observer } from 'mobx-react';
import * as React from 'react';
import { NodeView } from '.';
import { NodeTypeProps } from '../../node-types';
import { NodeAncestry, SNode } from '../../nodes';

interface ChildNodeListProps {
  node: SNode;
  ancestry: NodeAncestry;
}

export const ChildNodeList = observer(({ node, ancestry }: ChildNodeListProps) => (
  <div>
    {node.collapsed
      ? null
      : (node.children || []).map((child: Uuid, ix: number) =>
        <NodeView nodeId={child} ancestry={ancestry.concat([[node.id, ix]])} key={child} />)}
  </div>
));
