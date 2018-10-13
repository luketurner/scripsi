import { observer } from 'mobx-react';
import * as React from 'react';

import classNames = require('classnames');
import { state } from '..';
import { nodes } from '../../main';
import { getComponent } from '../../node-types';
import { NodeType, SNode } from '../../nodes';
import { NodeViewAnchor } from './anchor';
import { NodeViewDropTarget } from './node-drop-target';

export interface NodeViewProps {
  nodeId: string;
}

export const NodeView = observer(props => {

  let node: SNode;

  try {
    node = nodes.getNode(props.nodeId);
  } catch (e) {
    console.error('cannot render node', props.nodeId, e);
    return <div />;
  }

  const NodeTypeComponent = getComponent(node.type);

  const isOutlined = node.id === state.hoveredNode;

  return (
    <NodeViewDropTarget node={node}>
      <div className={classNames('p-1', isOutlined && ['bg-grey-lighter', 'highlight-children'])}>
        <NodeViewAnchor node={node} />
        <NodeTypeComponent node={node} />
      </div>
    </NodeViewDropTarget>
  );
});
