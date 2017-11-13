import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SNode } from '../../nodes';
import { NodeTextEditor } from '../../ui/editor';
import NodeView from '../node-view';
import { NodeTypeProps } from './types';

export default observer(({ node }: NodeTypeProps) => {

  const children = map(node.children, child =>
    <NodeView key={child} nodeId={child} />
  );

  return <div>
    {node.isVisible && <NodeTextEditor node={node} />}
    {node.collapsed || children}
  </div>;
});
