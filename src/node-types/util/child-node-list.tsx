import * as React from 'react';
import NodeView from '../../ui/node-view';
import { SNode } from '../../nodes';
import { observer } from 'mobx-react';

export const ChildNodeList = observer(({ node }: { node: SNode }) => (
  <div>
    {node.collapsed ? null : (node.children || []).map((child: Uuid) => <NodeView nodeId={child} key={child} />)}
  </div>
));
