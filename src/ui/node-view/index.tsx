import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { state } from '..';
import { nodes } from '../../main';
import { getDefinition } from '../../node-types';
import { NodeAncestry } from '../../nodes';
import { ChildNodeList } from './child-node-list';
import { NodeDropTarget } from './node-drop-target';
import classNames = require('classnames');
import { NodeMenu } from './node-menu';
import { NodeDragAnchor } from './node-drag-anchor';
import { NodeViewAnchor } from './anchor';

export interface NodeViewProps {
  nodeId: string;
  ancestry?: NodeAncestry;
}

export interface NodeContext {
  ancestry: NodeAncestry;
  isOutlined: boolean;
  isVisible: boolean;
  isFocused: boolean;
}

/**
 * Component that encapsulates rendering an editor for any node, based on ID.
 *
 * Looks up the node and chooses which component to use based on the type.
 */
export const NodeView = observer(({ nodeId, ancestry }: NodeViewProps) => {
  ancestry = ancestry || [];

  const node = nodes.getNode(nodeId);
  const definition = getDefinition(node.type);
  const isOutlined = node.id === state.hoveredNode;
  const isFocused = state.focusedNode === nodeId;
  const isVisible = true; // TODO

  // Does not need to be observable since context is intended to be write-only.
  const context = { ancestry, isOutlined, isVisible, isFocused };

  const view = (
    <div className={classNames('p-1', isOutlined && ['bg-blue-lightest', 'highlight-children'])}>

      <div onMouseEnter={() => state.hoverNode(node.id)} onMouseLeave={() => state.unhoverNode(node.id)}>
        <NodeDropTarget node={node} context={context}>

          <NodeMenu node={node} context={context} customMenuEntries={definition.menuEntries || undefined}>
            <NodeDragAnchor node={node} context={context}>
              <NodeViewAnchor node={node} context={context} />
            </NodeDragAnchor>
          </NodeMenu>

          {isVisible && <definition.component node={node} context={context} />}

        </NodeDropTarget>
      </div>

      <ChildNodeList node={node} context={context} />
    </div>
  )

  return definition.container ? <definition.container>{view}</definition.container> : view;
});
