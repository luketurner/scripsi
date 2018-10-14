import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { state } from '..';
import { NodeDragAnchor } from './node-drag-anchor';
import { NodeMenuAnchor } from './node-menu-anchor';
import classNames = require('classnames');
import { NodeAncestry, SNode } from '../../nodes';

interface NodeViewAnchorProps {
  node: SNode;
  ancestry: NodeAncestry;
}

export const NodeViewAnchor = observer(({ node, ancestry }: NodeViewAnchorProps) => {
  const hoverNode = action('ui.hoverNode', () => state.hoveredNode = node.id);
  const unhoverNode = action('ui.unhoverNode', () => state.hoveredNode = null);

  return (
    <NodeMenuAnchor node={node} ancestry={ancestry}>
      <NodeDragAnchor node={node} ancestry={ancestry}>
        <div
          className={classNames('w-16 h-2 highlightable flex cursor-pointer', { 'bg-grey-lighter': node.collapsed })}
          onMouseEnter={hoverNode}
          onMouseLeave={unhoverNode}
          onClick={node.toggleCollapsed}
        />
      </NodeDragAnchor>
    </NodeMenuAnchor>
  );
});
