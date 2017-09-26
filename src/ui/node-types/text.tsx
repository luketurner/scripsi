import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { NodeTextEditor } from '../../ui/editor';
import { SNode } from '../../nodes';
import NodeView from '../node-view';
import { NodeTypeProps } from './types';


export default observer(({ node, uiState }: NodeTypeProps) => {

  const children = map(node.children, (child) => 
    <NodeView uiState={uiState} key={child} nodeId={child} />
  );

  return <div>
    { node.isVisible && <NodeTextEditor node={node} uiState={uiState} /> }
    { node.collapsed || children }
  </div>;
});