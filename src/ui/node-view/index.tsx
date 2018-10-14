import { observer } from 'mobx-react';
import * as React from 'react';

import classNames = require('classnames');
import { state } from '..';
import { nodes } from '../../main';
import { getComponent } from '../../node-types';
import { NodeAncestry, NodeType, SNode } from '../../nodes';
import { NodeViewAnchor } from './anchor';
import { NodeDropTarget } from './node-drop-target';

export interface NodeViewProps {
  nodeId: string;
  ancestry?: NodeAncestry;
}

export const NodeView = observer(props => {
  const ancestry = props.ancestry || [];

  let node: SNode;

  try {
    node = nodes.getNode(props.nodeId);
  } catch (e) {
    console.error('cannot render node', props.nodeId, e);
    return <div />;
  }

  const NodeTypeComponent = getComponent(node.type);

  const isOutlined = node.id === state.hoveredNode;

  const isVisible = true; // TODO

  return (
    <NodeDropTarget node={node} ancestry={ancestry}>
      <div className={classNames('p-1', isOutlined && ['bg-grey-lighter', 'highlight-children'])}>
        <NodeViewAnchor node={node} ancestry={ancestry} />
        <NodeTypeComponent node={node} ancestry={ancestry} isVisible={isVisible} />
      </div>
    </NodeDropTarget>
  );
});
