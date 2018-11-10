import { observer } from 'mobx-react';
import * as React from 'react';

import classNames = require('classnames');
import { action } from 'mobx';
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

  const isOutlined = node.id === state.hoveredNodes[state.hoveredNodes.length - 1];

  const isVisible = true; // TODO
  const hoverNode = action('ui.hoverNode', (e: React.MouseEvent<any>) => {
    state.hoveredNodes.push(node.id);
  });
  const unhoverNode = action('ui.unhoverNode', (e: React.MouseEvent<any>) => {
    state.hoveredNodes.splice(-1, 1);
  });

  return (
    <NodeDropTarget node={node} ancestry={ancestry}>
      <div
        onMouseEnter={hoverNode}
        onMouseLeave={unhoverNode}
        className={classNames('p-1', isOutlined && ['bg-blue-lightest', 'highlight-children'])}
      >
        <NodeViewAnchor node={node} ancestry={ancestry} isOutlined={isOutlined} />
        <NodeTypeComponent node={node} ancestry={ancestry} isVisible={isVisible} />
      </div>
    </NodeDropTarget>
  );
});
