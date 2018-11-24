import { observer } from 'mobx-react-lite';
import * as React from 'react';

import classNames = require('classnames');
import { state } from '..';
import { nodes } from '../../main';
import { getComponent } from '../../node-types';
import { NodeAncestry } from '../../nodes';
import { NodeDropTarget } from './node-drop-target';

export interface NodeViewProps {
  nodeId: string;
  ancestry?: NodeAncestry;
  customMenuEntries?: React.ReactNodeArray;
  customChildNodes?: React.ReactNode;
  children?: React.ReactNode;
}

export interface NodeContext {
  ancestry: NodeAncestry;
  isOutlined: boolean;
  isVisible: boolean;
}

/**
 * Component that encapsulates rendering an editor for any node, based on ID.
 *
 * Looks up the node and chooses which component to use based on the type.
 */
export const NodeView = observer(({ nodeId, ancestry }: NodeViewProps) => {
  ancestry = ancestry || [];

  const node = nodes.getNode(nodeId);
  const NodeTypeComponent = getComponent(node.type);
  const isOutlined = node.id === state.hoveredNodes[state.hoveredNodes.length - 1];
  const isVisible = true; // TODO

  // Does not need to be observable since context is intended to be write-only.
  const nodeContext = { ancestry, isOutlined, isVisible };

  return <NodeTypeComponent node={node} context={nodeContext} />;
});
