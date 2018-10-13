import { observer } from 'mobx-react';
import * as React from 'react';
import { SNode } from '../../nodes';
import { NodeView } from '../../ui/node-view';

export const ChildNodeList = observer(({ node }: { node: SNode }) => (
  <div>
    {node.collapsed ? null : (node.children || []).map((child: Uuid) => <NodeView nodeId={child} key={child} />)}
  </div>
));
