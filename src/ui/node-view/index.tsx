import { observer } from 'mobx-react';
import * as React from 'react';

import { NodeType, SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';
import { NodeViewAnchor } from './anchor';
import { NodeViewDropTarget } from './node-drop-target';
import { getComponent } from '../../node-types';
import classNames = require('classnames');

export interface NodeViewProps {
  nodeId: string;
}

export default observer(props => {

  let node: SNode;

  try {
    node = nodeStore.getNode(props.nodeId);
  } catch (e) {
    console.error('cannot render node', props.nodeId, e);
    return <div />;
  }

  const NodeTypeComponent = getComponent(node.type);

  const isOutlined = node.id === uiState.hoveredNode;

  return (
    <NodeViewDropTarget node={node}>
      <div className={classNames('p-1', isOutlined && ['bg-grey-lighter', 'highlight-children'])}>
        <NodeViewAnchor node={node} />
        <NodeTypeComponent node={node} />
      </div>
    </NodeViewDropTarget>
  );
});
